const User = require('../auth/auth.model');
const Order = require('../order/order.model');
const Product = require('../product/product.model');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    
    // Get all orders to calculate revenue and sales
    const orders = await Order.find({}).sort({ createdAt: -1 });
    const orderCount = orders.length;
    
    const paidOrders = orders.filter(order => order.isPaid);
    const totalSales = paidOrders.length;
    
    const totalRevenue = paidOrders.reduce((acc, order) => {
      return acc + order.totalPrice;
    }, 0);

    // Get low stock products (less than 5)
    const lowStockProducts = await Product.find({ countInStock: { $lt: 10 } }).limit(5);

    // Get recent orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    // Calculate monthly sales for the last 6 months
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const month = date.getMonth();
      
      const monthlyTotal = orders
        .filter(order => {
          const orderDate = new Date(order.createdAt);
          return order.isPaid && orderDate.getMonth() === month && orderDate.getFullYear() === year;
        })
        .reduce((acc, order) => acc + order.totalPrice, 0);
        
      last6Months.push({
        name: monthName,
        sales: monthlyTotal
      });
    }

    res.json({
      userCount,
      productCount,
      orderCount,
      totalSales,
      totalRevenue: totalRevenue.toFixed(2),
      lowStockProducts,
      recentOrders,
      salesData: last6Months
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews
// @route   GET /api/admin/reviews
// @access  Private/Admin
const getAllReviews = async (req, res, next) => {
  try {
    const products = await Product.find({});
    let allReviews = [];
    
    products.forEach(product => {
      product.reviews.forEach(review => {
        allReviews.push({
          _id: review._id,
          productName: product.name,
          productId: product._id,
          user: review.user,
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          isApproved: review.isApproved,
          createdAt: review.createdAt
        });
      });
    });

    res.json(allReviews.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

// @desc    Approve review
// @route   PUT /api/admin/reviews/:productId/:reviewId/approve
// @access  Private/Admin
const approveReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (product) {
      const review = product.reviews.id(req.params.reviewId);

      if (review) {
        review.isApproved = true;
        
        // Recalculate rating based on approved reviews
        const approvedReviews = product.reviews.filter(r => r.isApproved);
        product.rating = approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length;
        product.numReviews = approvedReviews.length;

        await product.save();
        res.json({ message: 'Review approved' });
      } else {
        res.status(404);
        throw new Error('Review not found');
      }
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/admin/reviews/:productId/:reviewId
// @access  Private/Admin
const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (product) {
      const review = product.reviews.id(req.params.reviewId);

      if (review) {
        product.reviews.pull(req.params.reviewId);
        
        // Recalculate rating
        const approvedReviews = product.reviews.filter(r => r.isApproved);
        if (approvedReviews.length > 0) {
          product.rating = approvedReviews.reduce((acc, item) => item.rating + acc, 0) / approvedReviews.length;
        } else {
          product.rating = 0;
        }
        product.numReviews = approvedReviews.length;

        await product.save();
        res.json({ message: 'Review removed' });
      } else {
        res.status(404);
        throw new Error('Review not found');
      }
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get detailed reports
// @route   GET /api/admin/reports
// @access  Private/Admin
const getReports = async (req, res, next) => {
  try {
    const orders = await Order.find({ isPaid: true }).populate('orderItems.product', 'name category');
    
    // 1. Daily Sales & Revenue (Last 30 days)
    const dailyStats = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    orders.forEach(order => {
      const date = new Date(order.createdAt).toISOString().split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = { date, revenue: 0, orders: 0 };
      }
      dailyStats[date].revenue += order.totalPrice;
      dailyStats[date].orders += 1;
    });

    const dailyReport = Object.values(dailyStats)
      .filter(s => new Date(s.date) >= thirtyDaysAgo)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2. Product Wise Report
    const productStats = {};
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const prodId = item.product?._id;
        if (!prodId) return;
        
        if (!productStats[prodId]) {
          productStats[prodId] = {
            name: item.product.name,
            category: item.product.category,
            quantity: 0,
            revenue: 0
          };
        }
        productStats[prodId].quantity += item.qty;
        productStats[prodId].revenue += item.price * item.qty;
      });
    });

    const productReport = Object.values(productStats).sort((a, b) => b.revenue - a.revenue);

    // 3. Category Wise Report
    const categoryStats = {};
    Object.values(productStats).forEach(prod => {
      if (!categoryStats[prod.category]) {
        categoryStats[prod.category] = { category: prod.category, revenue: 0, quantity: 0 };
      }
      categoryStats[prod.category].revenue += prod.revenue;
      categoryStats[prod.category].quantity += prod.quantity;
    });

    const categoryReport = Object.values(categoryStats).sort((a, b) => b.revenue - a.revenue);

    // 4. Monthly Report (Last 12 months)
    const monthlyStats = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthLabel = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      const month = date.getMonth();
      const year = date.getFullYear();

      const monthlyOrders = orders.filter(o => {
        const oDate = new Date(o.createdAt);
        return oDate.getMonth() === month && oDate.getFullYear() === year;
      });

      monthlyStats.push({
        month: monthLabel,
        revenue: monthlyOrders.reduce((sum, o) => sum + o.totalPrice, 0),
        orders: monthlyOrders.length
      });
    }

    res.json({
      dailyReport,
      productReport,
      categoryReport,
      monthlyReport: monthlyStats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all payments
// @route   GET /api/admin/payments
// @access  Private/Admin
const getPayments = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    
    const payments = orders.map(order => ({
      _id: order._id,
      user: order.user,
      amount: order.totalPrice,
      method: order.paymentMethod,
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      isRefunded: order.isRefunded,
      refundAt: order.refundAt,
      transactionId: order.paymentResult?.id || 'N/A',
      status: order.isRefunded ? 'Refunded' : order.isPaid ? 'Paid' : 'Pending',
      createdAt: order.createdAt
    }));

    res.json(payments);
  } catch (error) {
    next(error);
  }
};

// @desc    Process refund
// @route   PUT /api/admin/payments/:id/refund
// @access  Private/Admin
const processRefund = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (!order.isPaid) {
        res.status(400);
        throw new Error('Cannot refund an unpaid order');
      }
      
      order.isRefunded = true;
      order.refundAt = Date.now();
      order.refundDetails = {
        status: 'COMPLETED',
        id: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      await order.save();
      res.json({ message: 'Refund processed successfully' });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
