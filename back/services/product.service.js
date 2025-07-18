const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getProducts(queryParams) {
    const {
        collection: collectionName,
        category: categoryName,
        metal: metalTypeName,
        sort,
        search,
    } = queryParams;

    const page = parseInt(queryParams.page, 10) || 1;
    const limit = parseInt(queryParams.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filters = [];
    const sqlParams = [];

    // Filter by Collection
    if (collectionName) {
        const collection = await prisma.collections.findFirst({
            where: { name: collectionName },
            select: { id: true },
        });
        if (collection) {
            filters.push(`collectionId = ?`);
            sqlParams.push(collection.id);
        } else {
            return {
                data: [],
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalItems: 0,
                    pageSize: limit,
                    message: `Collection '${collectionName}' not found.`,
                },
            };
        }
    }

    // Filter by Category
    if (categoryName) {
        const category = await prisma.categories.findFirst({
            where: { name: categoryName },
            select: { id: true },
        });

        if (category) {
            filters.push(`categoryId = ?`);
            sqlParams.push(category.id);
        } else {
            return {
                data: [],
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalItems: 0,
                    pageSize: limit,
                    message: `Category '${categoryName}' not found.`,
                },
            };
        }
    }

    // Filter by metalType (JSON Array)
    if (metalTypeName) {
        filters.push(`JSON_CONTAINS(metalType, ?)`);
        sqlParams.push(JSON.stringify([metalTypeName]));
    }

    // Fulltext search on name, description and shortDescription
    if (search) {
        filters.push(`MATCH(products.name, products.description, products.shortDescription) AGAINST (? IN NATURAL LANGUAGE MODE)`);
        sqlParams.push(search);
    }

    // Sort clause
    let orderBy = `ORDER BY id DESC`;
    switch (sort) {
        case 'newest':
            orderBy = `ORDER BY isNew DESC`;
            break;
        case 'bestsellers':
            orderBy = `ORDER BY isBestSeller DESC`;
            break;
        case 'price_asc':
            orderBy = `ORDER BY price ASC`;
            break;
        case 'price_desc':
            orderBy = `ORDER BY price DESC`;
            break;
    }

    const whereSQL = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const limitSQL = `LIMIT ${limit} OFFSET ${skip}`;

    try {
        const products = await prisma.$queryRawUnsafe(
            `SELECT products.*, collections.name AS collection, categories.name AS category ` +
            `FROM products ` +
            `INNER JOIN collections ON products.collectionId = collections.id ` +
            `INNER JOIN categories ON products.categoryId = categories.id ` +
            `${whereSQL} ${orderBy} ${limitSQL}`,
            ...sqlParams
        );

        // Preprocess product data
        products.forEach(product => {
            if (product.metalType && typeof product.metalType === "string") product.metalType = JSON.parse(product.metalType);
            if (product.images && typeof product.images === "string") product.images = JSON.parse(product.images);
            product.isNew = Boolean(product.isNew);
            product.isBestSeller = Boolean(product.isBestSeller);
        });

        const [{ count }] = await prisma.$queryRawUnsafe(
            `SELECT COUNT(*) as count FROM products ${whereSQL}`,
            ...sqlParams
        );

        const totalPages = Math.ceil(Number(count) / limit);

        return {
            data: products,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: Number(count),
                pageSize: limit,
            },
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Could not retrieve products.');
    }
}

async function getProductById(productId) {
    try {
        const product = await prisma.products.findUnique({
            where: { id: productId },
            include: {
                collection: true,
                category: true,
            },
        });

        if (!product) {
            return null;
        }

        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Could not retrieve product.');
    }
}

module.exports = {
    getProducts,
    getProductById,
};
