const { createCheckoutSession } = require('../services/checkout.service');

exports.checkoutControllerFunction = async (req, res) => {
    const customer = req.user;
    const { addressId } = req.body;

    if (!addressId) {
        return res.status(400).json({ error: 'Address ID is required' });
    }

    try {
        const session = await createCheckoutSession(customer, addressId);
        res.status(200).json(session);
    } catch (error) {
        console.error('Error in checkoutControllerFunction:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
}