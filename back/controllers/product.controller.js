const { getProducts } = require('../services/product.service');

exports.getProducts = async (req, res) => {
    try {
        const products = await getProducts(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}