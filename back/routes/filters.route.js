const express = require('express');
const router = express.Router();
const filterController = require('../controllers/filters.controller');

router.get('/', filterController.getFilters);

module.exports = router;