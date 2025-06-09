const { PrismaClient } = require('../generated/prisma');
const natural = require('natural');

const prisma = new PrismaClient();
const TfIdf = natural.TfIdf;

async function getProductsAndPurchasedProductIds(customerId) {
    // Fetch all products
    const products = await prisma.products.findMany({
        include: {
            collection: true,
            category: true,
        },
    });

    // Fetch purchased product ids of the customer
    const purchasedOrders = await prisma.orders.findMany({
        where: {
            customerId: customerId,
            paymentStatus: 'paid',
        },
    });

    const purchasedProductIds = [...new Set(purchasedOrders.flatMap(order => order.cartItems.map(item => item.product.id)))];

    return { products, purchasedProductIds };
}

async function getRecommendations(customerId, topN = 10) {
    const tfidf = new TfIdf();

    const { products, purchasedProductIds } = await getProductsAndPurchasedProductIds(customerId);

    // Add all product descriptions as documents
    function getCombinedText(product) {
        return [
            product.name || '',
            product.description || '',
            product.category.name || '',
        ].join(' ').toLowerCase();
    }

    products.forEach((product) => {
        const text = getCombinedText(product);
        tfidf.addDocument(text);
    });

    //============================================

    // Helper: get tf-idf vector for a document by index
    function getVector(docIndex) {
        const terms = tfidf.listTerms(docIndex);
        const vec = {};
        for (const { term, tfidf: val } of terms) {
            if (val > 0) vec[term] = val;
        }
        return vec;
    }

    // Cosine similarity between two sparse vectors represented as Maps
    function cosineSimilarity(vecA, vecB) {
        const terms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
        let dot = 0, magA = 0, magB = 0;

        for (const term of terms) {
            const a = vecA[term] || 0;
            const b = vecB[term] || 0;
            dot += a * b;
            magA += a * a;
            magB += b * b;
        }

        return (magA && magB) ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
    }

    //===========================================

    // Get vectors for all products
    const productVectors = products.map((_, idx) => getVector(idx));

    // Collect similarities for each product not purchased
    const recommendations = [];

    purchasedProductIds.forEach((id) => {
        const purchasedIndex = products.findIndex(p => p.id === id);
        if (purchasedIndex === -1) return;

        const purchasedVec = productVectors[purchasedIndex];

        products.forEach((product, idx) => {
            if (purchasedProductIds.includes(product.id)) return; // skip purchased product

            const similarity = cosineSimilarity(purchasedVec, productVectors[idx]);
            if (similarity > 0) {
                recommendations.push({ product, similarity });
            }
        });
    });

    // Sort by similarity descending
    recommendations.sort((a, b) => b.similarity - a.similarity);

    // Limit to top N recommendations
    const topRecommendations = recommendations.slice(0, topN);

    return topRecommendations;
}

module.exports = {
    getRecommendations,
};