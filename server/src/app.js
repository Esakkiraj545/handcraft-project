const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/error.middleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/products', require('./modules/product/product.routes'));
app.use('/api/orders', require('./modules/order/order.routes'));
app.use('/api/admin', require('./modules/admin/admin.routes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Middleware
app.use(errorHandler);

module.exports = app;
