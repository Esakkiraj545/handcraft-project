const Address = require('./address.model');

// @desc    Add or update user address
// @route   POST /api/address
// @access  Private
const saveAddress = async (req, res, next) => {
  try {
    const { fullName, phone, address, city, state, pincode } = req.body;

    let userAddress = await Address.findOne({ user: req.user._id });

    if (userAddress) {
      // Update existing address
      userAddress.fullName = fullName || userAddress.fullName;
      userAddress.phone = phone || userAddress.phone;
      userAddress.address = address || userAddress.address;
      userAddress.city = city || userAddress.city;
      userAddress.state = state || userAddress.state;
      userAddress.pincode = pincode || userAddress.pincode;

      const updatedAddress = await userAddress.save();
      res.json(updatedAddress);
    } else {
      // Create new address
      const newAddress = await Address.create({
        user: req.user._id,
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      });
      res.status(201).json(newAddress);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user address
// @route   GET /api/address
// @access  Private
const getAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ user: req.user._id });
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveAddress,
  getAddress,
};
