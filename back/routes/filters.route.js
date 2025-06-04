const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filters.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', filterController.getFilters);

module.exports = router;