const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getDashboardStats,
} = require('./admin.controller');
const { protect } = require('../../middleware/auth.middleware');
const { admin } = require('../../middleware/role.middleware');

router.get('/stats', protect, admin, getDashboardStats);
router.route('/users').get(protect, admin, getUsers);
router
  .route('/users/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

module.exports = router;
