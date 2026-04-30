const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  createRazorpayOrder,
  verifyRazorpayPayment,
} = require('./order.controller');
const { protect } = require('../../middleware/auth.middleware');
const { admin } = require('../../middleware/role.middleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.post('/razorpay', protect, createRazorpayOrder);
router.post('/verify', protect, verifyRazorpayPayment);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
