const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getFeaturedCollections() {
    const collections = await prisma.collections.findMany({
        where: { isFeatured: true },
        orderBy: { id: 'desc' },
        include: {
            _count: {
                select: {
                    products: true,
                }
            }
        },
    });

    return collections;
}

async function getLatestBestSellers() {
    const products = await prisma.products.findMany({
        where: { isBestSeller: true },
        orderBy: { id: 'desc' },
    });

    return products;
}

async function getNewArrivals() {
    const products = await prisma.products.findMany({
        where: { isNew: true },
        orderBy: { id: 'desc' },
    });

    return products;
}

async function getHomepageData() {
    const [featuredCollections, bestSellers, newArrivals] = await Promise.all([
        getFeaturedCollections(),
        getLatestBestSellers(),
        getNewArrivals(),
    ]);

    return {
        featuredCollections,
        bestSellers,
        newArrivals,
    };
}

module.exports = {
    getHomepageData,
};