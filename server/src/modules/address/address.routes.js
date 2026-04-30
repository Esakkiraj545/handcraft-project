const express = require('express');
const router = express.Router();
const { saveAddress, getAddress } = require('./address.controller');
const { protect } = require('../../middleware/auth.middleware');

router.route('/')
  .post(protect, saveAddress)
  .get(protect, getAddress);

module.exports = router;
