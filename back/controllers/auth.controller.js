const jwt = require('jsonwebtoken');
const { registerCustomer, loginCustomer, getCustomerById } = require('../services/auth.service');

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

exports.loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const customer = await loginCustomer(email, password);

        const token = jwt.sign(
            { type: 'customer', id: customer.id, email: customer.email, name: customer.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, customer });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Failed to log in user' });
    }
};

exports.verifyToken = async (req, res) => {
    const user = req.user;    

    try {
        if (user.type === 'customer') {
            const customer = await getCustomerById(user.id);
            return res.status(200).json({ 
                customer: customer,
                serverParams: {
                    payhereMaxAmount: parseFloat(process.env.PAYHERE_MAX_AMOUNT),
                } 
            });
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }
    } catch (error) {
        console.error('Error retriving user data:', error);
        return res.status(500).json({ error: 'Failed to retrive user data' });
    }
}