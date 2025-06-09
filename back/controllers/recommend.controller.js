const { getRecommendations } = require('../services/recommend.service');

exports.getRecommendations = async (req, res) => {
    const customerId = req.user.id;

    try {
        const recommendations = await getRecommendations(customerId);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
}