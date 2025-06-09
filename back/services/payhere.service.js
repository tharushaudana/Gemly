const { PrismaClient } = require('../generated/prisma');
const { verifyReceivedNotify } = require('../payhere/payhere');
const { clearCart } = require('../services/cart.service')
const prisma = new PrismaClient();

const STATUS_SUCCESS = '2';

async function handleNotify(body) {
    const { order_id, status_code, md5sig } = body;

    // Verify the notification
    if (!verifyReceivedNotify(body)) {
        throw new Error('Invalid notification received');
    }

    // Check if the status code indicates success
    if (status_code !== STATUS_SUCCESS) {
        throw new Error(`Payment failed with status code: ${status_code}`);
    }

    // Update the order status to 'paid' and save the MD5 signature 
    const updatedOrder = await prisma.orders.update({
        where: { id: order_id },
        data: { 
            paymentStatus: 'paid', 
            paymentMd5Sig: md5sig, 
        },
    });

    // Clear the cart for the customer
    await clearCart(updatedOrder.customerId);

    return updatedOrder;
}

module.exports = {
    handleNotify,
};