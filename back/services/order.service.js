const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getOrders(customerId) {
    const orders = await prisma.orders.findMany({
        where: { customerId, paymentStatus: 'paid' },
        orderBy: { createdAt: 'desc' },
        include: {
            customer: true,
        },
    });

    return orders;
}

async function getOrderById(customerId, orderId) {
    const order = await prisma.orders.findUnique({
        where: { id: orderId },
        include: {
            customer: true,
        },
    });

    if (!order || order.customerId !== customerId) {
        throw new Error('Order not found');
    }

    return order;
}

module.exports = {
    getOrders,
    getOrderById,
};