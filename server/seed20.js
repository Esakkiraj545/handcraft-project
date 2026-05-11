const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Product = require('./src/modules/product/product.model');

dotenv.config({ path: './.env' });

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    
    // Create a dummy user ID for seeding
    const dummyUserId = new mongoose.Types.ObjectId();

    await Product.deleteMany();
    console.log('Existing products removed.');

    const imageDir = path.join(__dirname, '../client/public/images');
    const imageFiles = fs.readdirSync(imageDir);

    const getImagePath = (baseName) => {
        const file = imageFiles.find(f => f.startsWith(baseName) && f.endsWith('.png'));
        return file ? `/images/${file}` : '/images/default.png';
    };

    const products = [
      { name: 'Golden Leaf Jhumka', price: 399, category: 'Jhumka', base: 'golden_leaf_jhumka' },
      { name: 'Pearl Drop Elegance', price: 499, category: 'Modern', base: 'pearl_drop_elegance' },
      { name: 'Antique Temple Jhumka', price: 699, category: 'Traditional', base: 'antique_temple_jhumka' },
      { name: 'Minimal Stud Glow', price: 199, category: 'Studs', base: 'minimal_stud_glow' },
      { name: 'Boho Hoop Charm', price: 349, category: 'Hoops', base: 'boho_hoop_charm' },
      { name: 'Floral Clay Earrings', price: 299, category: 'Studs', base: 'floral_clay_earrings' },
      { name: 'Silk Thread Jhumka', price: 399, category: 'Jhumka', base: 'silk_thread_jhumka' },
      { name: 'Vintage Coin Drop', price: 549, category: 'Traditional', base: 'vintage_coin_drop' },
      { name: 'Crystal Shine Studs', price: 249, category: 'Studs', base: 'crystal_shine_studs' },
      { name: 'Ethnic Mirror Jhumka', price: 459, category: 'Jhumka', base: 'ethnic_mirror_jhumka' },
      { name: 'Royal Pearl Chandbali', price: 799, category: 'Traditional', base: 'royal_pearl_chandbali' },
      { name: 'Matte Gold Hoops', price: 299, category: 'Hoops', base: 'matte_gold_hoops' },
      { name: 'Handmade Terracotta Set', price: 499, category: 'Traditional', base: 'handmade_terracotta_set' },
      { name: 'Elegant Black Studs', price: 199, category: 'Studs', base: 'elegant_black_studs' },
      { name: 'Designer Kundan Jhumka', price: 899, category: 'Traditional', base: 'designer_kundan_jhumka' },
      { name: 'Soft Pastel Clay Drops', price: 349, category: 'Modern', base: 'soft_pastel_clay_drops' },
      { name: 'Classic Silver Hoops', price: 299, category: 'Hoops', base: 'classic_silver_hoops' },
      { name: 'Bridal Heavy Jhumka', price: 999, category: 'Traditional', base: 'bridal_heavy_jhumka' },
      { name: 'Daily Wear Tiny Studs', price: 149, category: 'Studs', base: 'daily_wear_tiny_studs' },
      { name: 'Lotus Design Earrings', price: 399, category: 'Traditional', base: 'lotus_design_earrings' }
    ];

    const dbProducts = products.map((p) => ({
      user: dummyUserId,
      name: p.name,
      image: getImagePath(p.base),
      brand: 'Aakriti',
      category: p.category,
      description: `A beautifully handcrafted ${p.name} that brings elegance to your style.`,
      price: p.price,
      countInStock: Math.floor(Math.random() * 20) + 5,
    }));

    await Product.insertMany(dbProducts);
    console.log('20 Custom Products Seeded Successfully with AI Images!');
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedProducts();
