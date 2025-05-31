const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

// Define a test route
router.get('/', testController.testControllerFunction);

module.exports = router;