const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware('customer'), wishlistController.getWishlist);
router.post('/', authMiddleware('customer'), wishlistController.addToWishlist);
router.delete('/', authMiddleware('customer'), wishlistController.removeFromWishlist);

module.exports = router;