const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post('/add_address', authMiddleware('customer'), customerController.addAddress);
router.post('/update_address', authMiddleware('customer'), customerController.updateAddress);
router.delete('/delete_address', authMiddleware('customer'), customerController.deleteAddress);

module.exports = router;