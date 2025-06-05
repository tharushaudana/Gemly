const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

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
    getOrderById,
};