const { getHomepageData } = require('../services/homepage.service');

exports.getHomepage = async (req, res) => {
    try {
        const homepageData = await getHomepageData();
        res.status(200).json(homepageData);
    } catch (error) {
        console.error('Error fetching homepage data:', error);
        res.status(500).json({ error: 'Failed to fetch homepage data' });
    }
}