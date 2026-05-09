const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getDashboardStats,
  getAllReviews,
  approveReview,
  deleteReview,
  getReports,
  getPayments,
  processRefund,
} = require('./admin.controller');
const { protect } = require('../../middleware/auth.middleware');
const { admin } = require('../../middleware/role.middleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/reports', protect, admin, getReports);
router.get('/payments', protect, admin, getPayments);
router.put('/payments/:id/refund', protect, admin, processRefund);
router.get('/reviews', protect, admin, getAllReviews);
router.put('/reviews/:productId/:reviewId/approve', protect, admin, approveReview);
router.delete('/reviews/:productId/:reviewId', protect, admin, deleteReview);
router.route('/users').get(protect, admin, getUsers);
router
  .route('/users/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

module.exports = router;
