const { addToCart, getCartByCustomerId, removeFromCart } = require('../services/cart.service');

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

    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Product ID, quantity, and metal type are required' });
    }

    if (!metalType) {
        return res.status(400).json({ error: 'Please select a metal type' });
    }

    try {
        const newCartItem = await addToCart(customerId, productId, quantity, metalType);
        res.status(200).json(newCartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error });
    }
}

exports.removeFromCart = async (req, res) => {
    const { cartItemId } = req.body;
    const customerId = req.user.id;

    if (!cartItemId) {
        return res.status(400).json({ error: 'Cart item ID is required' });
    }

    try {
        await removeFromCart(customerId, cartItemId);
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
}