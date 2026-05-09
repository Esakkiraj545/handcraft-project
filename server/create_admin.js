const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/modules/auth/auth.model');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const adminExists = await User.findOne({ email: 'admin@aakriti.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@aakriti.com',
      password: 'adminpassword123',
      phone: '9876543210',
      role: 'admin',
    });

    if (admin) {
      console.log('Admin user created successfully!');
      console.log('Email: admin@aakriti.com');
      console.log('Password: adminpassword123');
    }

    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
