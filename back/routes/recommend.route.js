const express = require('express');
const router = express.Router();
const recommendController = require('../controllers/recommend.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware('customer'), recommendController.getRecommendations);

module.exports = router;