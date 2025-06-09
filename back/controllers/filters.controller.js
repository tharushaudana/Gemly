const { getFilters } = require('../services/filters.service');

exports.getFilters = async (req, res) => {
    try {
        const filters = await getFilters();
        res.status(200).json(filters);
    } catch (error) {
        console.error('Error in getFilters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};