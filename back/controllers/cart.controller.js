const { addToCart, getCartByCustomerId } = require('../services/cart.service');

exports.getCart = async (req, res) => {
    const customerId = req.user.id;

    try {
        const cartItems = await getCartByCustomerId(customerId);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
}

exports.addToCart = async (req, res) => {
    const { productId, quantity, metalType } = req.body;
    const customerId = req.user.id;

    if (!productId || !quantity || !metalType) {
        return res.status(400).json({ error: 'Product ID, quantity, and metal type are required' });
    }

    try {
        const newCartItem = await addToCart(customerId, productId, quantity, metalType);
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
}