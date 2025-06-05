const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getWishlistByCustomerId(customerId) {
    return await prisma.wishlistItems.findMany({
        where: {
            customerId,
        },
        include: {
            product: true,
        },
    });
}

async function addToWishlist(customerId, productId) {
    // Check if the item already exists in the wishlist
    const existingItem = await prisma.wishlistItems.findFirst({
        where: {
            customerId,
            productId,
        },
    });

    // If it exists, return the existing item
    if (existingItem) {
        return existingItem;
    }

    return await prisma.wishlistItems.create({
        data: {
            customerId,
            productId,
        },
    });
}

async function removeFromWishlist(customerId, productId) {
    return await prisma.wishlistItems.delete({
        where: {
            productId: productId,
            customerId,
        },
    });
}

module.exports = {
    getWishlistByCustomerId,
    addToWishlist,
    removeFromWishlist,
};
