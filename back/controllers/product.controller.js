const { getProducts, getProductById } = require('../services/product.service');

exports.getProducts = async (req, res) => {
    try {
        const products = await getProducts(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getProductById = async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        const product = await getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error in getProductById:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};