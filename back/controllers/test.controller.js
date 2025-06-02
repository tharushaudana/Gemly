const { test } = require('../services/test.service');

exports.testControllerFunction = async (req, res) => {
    try {
        const result = await test();
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error in testControllerFunction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}