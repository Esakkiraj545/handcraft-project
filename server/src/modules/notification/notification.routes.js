const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllAsRead } = require('./notification.controller');
const { protect } = require('../../middleware/auth.middleware');

router.route('/').get(protect, getNotifications);
router.put('/readall', protect, markAllAsRead);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
