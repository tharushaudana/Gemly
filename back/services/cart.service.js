const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getCartByCustomerId(customerId) {
    return await prisma.cartItems.findMany({
        where: {
            customerId,
        },
        include: {
            product: true,
        },
    });
}

async function addToCart(customerId, productId, quantity, metalType) {
    // Check if the item already exists in the cart
    const existingItem = await prisma.cartItems.findFirst({
        where: {
            customerId,
            productId,
            metalType,
        },
    });

    // If it exists and the metal type matches, update the quantity
    if (existingItem && existingItem.metalType === metalType) {
        return await prisma.cartItems.update({
            where: {
                id: existingItem.id,
            },
            data: {
                quantity: existingItem.quantity + quantity,
            },
        });
    }

    return await prisma.cartItems.create({
        data: {
            customerId,
            productId,
            quantity,
            metalType,
        },
    });
}

async function removeFromCart(customerId, cartItemId) {
    return await prisma.cartItems.delete({
        where: {
            id: cartItemId,
            customerId,
        },
    });
}

module.exports = {
    getCartByCustomerId,
    addToCart,
    removeFromCart,
};