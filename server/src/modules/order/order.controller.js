const Order = require('./order.model');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Notification = require('../notification/notification.model');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      // Create Notification
      await Notification.create({
        user: order.user,
        title: 'Order Delivered',
        message: `Great news! Your order #${order._id.toString().slice(-6).toUpperCase()} has been delivered. Enjoy your handcrafted treasures!`,
        type: 'order_delivered',
        orderId: order._id,
      });

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create Razorpay Order
// @route   POST /api/orders/razorpay
// @access  Private
const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    console.log('Razorpay Options:', options);
    const order = await razorpay.orders.create(options);

    if (!order) {
      res.status(500);
      throw new Error('Error creating Razorpay order');
    }

    res.json(order);
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    next(error);
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/orders/verify
// @access  Private
const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order to paid
      const order = await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: razorpay_payment_id,
          status: 'success',
          update_time: Date.now().toString(),
        };

        await order.save();

        // Create Notification
        await Notification.create({
          user: order.user,
          title: 'Order Successful',
          message: `Your order #${order._id.toString().slice(-6).toUpperCase()} has been successfully placed!`,
          type: 'order_success',
          orderId: order._id,
        });

        res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
    } else {
      res.status(400);
      throw new Error('Invalid signature');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  createRazorpayOrder,
  verifyRazorpayPayment,
};
