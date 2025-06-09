const { addToWishlist, getWishlistByCustomerId, removeFromWishlist, clearWishlist } = require('../services/wishlist.service');

exports.getWishlist = async (req, res) => {
    const customerId = req.user.id;

    try {
        const wishlistItems = await getWishlistByCustomerId(customerId);
        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
}

exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const customerId = req.user.id;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        const newWishlistItem = await addToWishlist(customerId, productId);
        res.status(200).json(newWishlistItem);
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        res.status(500).json({ error: 'Failed to add item to wishlist' });
    }
}

exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.body;
    const customerId = req.user.id;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        await removeFromWishlist(customerId, productId);
        res.status(200).json({ message: 'Item removed from wishlist successfully' });
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({ error: 'Failed to remove item from wishlist' });
    }
}

exports.clearWishlist = async (req, res) => {
    const customerId = req.user.id;

    try {
        await clearWishlist(customerId);
        res.status(200).json({ message: 'Wishlist cleared successfully' });
    } catch (error) {
        console.error('Error clearing wishlist:', error);
        res.status(500).json({ error: 'Failed to clear wishlist' });
    }
}