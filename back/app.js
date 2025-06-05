const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const homepageRoutes = require('./routes/homepage.route');
const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const filterRoutes = require('./routes/filters.route');
const customerRoutes = require('./routes/customer.route');
const cartRoutes = require('./routes/cart.route');
const wishlistRoutes = require('./routes/wishlist.route');
const checkoutRoutes = require('./routes/checkout.route');
const payhereRoutes = require('./routes/payhere.route');
const orderRoutes = require('./routes/order.route');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/homepage', homepageRoutes);

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/filters', filterRoutes);
app.use('/customer', customerRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/orders', orderRoutes);

app.use('/payhere', payhereRoutes);

module.exports = app;