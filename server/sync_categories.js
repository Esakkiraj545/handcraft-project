const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Product = require('./src/modules/product/product.model');
const Category = require('./src/modules/category/category.model');

const syncCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    const uniqueCategories = [...new Set(products.map(p => p.category))];

    console.log('Found categories in products:', uniqueCategories);

    for (const catName of uniqueCategories) {
      if (!catName) continue;

      const slug = catName.toLowerCase().split(' ').join('-');
      const exists = await Category.findOne({ name: catName });

      if (!exists) {
        await Category.create({
          name: catName,
          slug: slug
        });
        console.log(`Created category: ${catName}`);
      } else {
        console.log(`Category already exists: ${catName}`);
      }
    }

    console.log('Sync complete!');
    process.exit();
  } catch (error) {
    console.error('Error syncing categories:', error);
    process.exit(1);
  }
};

syncCategories();
