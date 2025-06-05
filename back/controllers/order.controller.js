const { getOrderById } = require('../services/order.service');

exports.getOrderDetails = async (req, res) => {
    const customerId = req.user.id;
    const orderId = req.params.id;

    if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
    }

    try {
        const orderDetails = await getOrderById(customerId, orderId);
        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ error: 'Failed to fetch order details' });
    }
}