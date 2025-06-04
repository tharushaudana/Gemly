const { registerCustomer } = require('../services/auth.service');

exports.registerCustomer = async (req, res) => {
    const { email, phone, password, name } = req.body;

    if (!email || !phone || !password || !name) {
        return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    try {
        const customer = await registerCustomer(email, phone, password, name);
        res.status(200).json({ message: 'User registered successfully', customer });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
}