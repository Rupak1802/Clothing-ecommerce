require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false
      }
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      // Oversized Collection
      {
        name: 'Drop Shoulder T-shirt', price: 1800, category: 'T-Shirts', collectionName: 'oversized', brand: 'THUKIL', description: 'A premium oversized drop shoulder t-shirt crafted from heavy cotton blend.', image: '/oversized - 1.jpg', images: ['/oversized - 1.jpg', '/trench_back.png'], countInStock: 10, sizes: ['M', 'L', 'XL'], colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#ffffff' }], user: adminUser
      },
      {
        name: 'Baggy Jeans', price: 2500, category: 'Pants', collectionName: 'oversized', brand: 'THUKIL', description: 'High-waisted baggy jeans cut from premium denim.', image: '/oversized - 2.jpg', images: ['/oversized - 2.jpg', '/trouser_back.png'], countInStock: 8, sizes: ['28', '30', '32', '34'], colors: [{ name: 'Blue', hex: '#0000ff' }, { name: 'Black', hex: '#000000' }], user: adminUser
      },
      {
        name: 'Oversized Hoodie', price: 3200, category: 'Outerwear', collectionName: 'oversized', brand: 'THUKIL', description: 'Heavyweight oversized hoodie with dropped shoulders and a cozy fleece interior.', image: '/hero-image.png', images: ['/hero-image.png'], countInStock: 15, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Grey', hex: '#808080' }, { name: 'Black', hex: '#000000' }], user: adminUser
      },
      {
        name: 'Wide Leg Trousers', price: 2200, category: 'Pants', collectionName: 'oversized', brand: 'THUKIL', description: 'Relaxed fit wide leg trousers for a comfortable yet elevated look.', image: '/Oversized outfit.jpg', images: ['/Oversized outfit.jpg'], countInStock: 12, sizes: ['30', '32', '34', '36'], colors: [{ name: 'Olive', hex: '#808000' }, { name: 'Navy', hex: '#000080' }], user: adminUser
      },
      {
        name: 'Boxy Fit Knit Sweater', price: 2800, category: 'Knitwear', collectionName: 'oversized', brand: 'THUKIL', description: 'Chunky knit sweater with a boxy silhouette.', image: '/trench_back.png', images: ['/trench_back.png'], countInStock: 5, sizes: ['M', 'L'], colors: [{ name: 'Cream', hex: '#FFFDD0' }, { name: 'Charcoal', hex: '#36454F' }], user: adminUser
      },
      {
        name: 'Oversized Graphic Tee', price: 1500, category: 'T-Shirts', collectionName: 'oversized', brand: 'THUKIL', description: 'Streetwear inspired oversized tee with custom THUKIL graphics.', image: '/oversized - 1.jpg', images: ['/oversized - 1.jpg'], countInStock: 20, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'White', hex: '#FFFFFF' }], user: adminUser
      },

      // Polos Collection
      {
        name: 'Classic Polo T-shirt', price: 1450, category: 'Polos', collectionName: 'polos', brand: 'THUKIL', description: 'A refined polo t-shirt with a structured collar and premium knit feel.', image: '/polo -1.jpg', images: ['/polo -1.jpg', '/knit_back.png'], countInStock: 5, sizes: ['S', 'M', 'L'], colors: [{ name: 'Navy', hex: '#000080' }, { name: 'White', hex: '#ffffff' }], user: adminUser
      },
      {
        name: 'Knit Zip Polo', price: 2100, category: 'Polos', collectionName: 'polos', brand: 'THUKIL', description: 'Retro-inspired knit polo with a quarter-zip closure.', image: '/Polo outfit.jpg', images: ['/Polo outfit.jpg'], countInStock: 7, sizes: ['M', 'L', 'XL'], colors: [{ name: 'Brown', hex: '#8B4513' }, { name: 'Cream', hex: '#FFFDD0' }], user: adminUser
      },
      {
        name: 'Long Sleeve Polo', price: 1800, category: 'Polos', collectionName: 'polos', brand: 'THUKIL', description: 'Elevated long sleeve polo for transitional weather.', image: '/knit_back.png', images: ['/knit_back.png'], countInStock: 10, sizes: ['S', 'M', 'L'], colors: [{ name: 'Black', hex: '#000000' }, { name: 'Burgundy', hex: '#800020' }], user: adminUser
      },
      {
        name: 'Textured Cotton Polo', price: 1600, category: 'Polos', collectionName: 'polos', brand: 'THUKIL', description: 'Breathable textured cotton polo for warm days.', image: '/polo -1.jpg', images: ['/polo -1.jpg'], countInStock: 14, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Forest Green', hex: '#228B22' }, { name: 'White', hex: '#FFFFFF' }], user: adminUser
      },
      {
        name: 'Silk Blend Polo', price: 3500, category: 'Polos', collectionName: 'polos', brand: 'THUKIL', description: 'Luxury silk-cotton blend polo for an incredibly soft drape.', image: '/Polo outfit.jpg', images: ['/Polo outfit.jpg'], countInStock: 4, sizes: ['M', 'L'], colors: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Navy', hex: '#000080' }], user: adminUser
      },

      // Regulars Collection
      {
        name: 'Henley Regular Shirt', price: 1200, category: 'Shirts', collectionName: 'regulars', brand: 'THUKIL', description: 'A classic henley neck shirt designed for the perfect regular fit.', image: '/regular -1.jpg', images: ['/regular -1.jpg', '/dress_back.png'], countInStock: 12, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Olive', hex: '#808000' }, { name: 'Oatmeal', hex: '#dcd7c9' }], user: adminUser
      },
      {
        name: 'Essential Crewneck Tee', price: 900, category: 'T-Shirts', collectionName: 'regulars', brand: 'THUKIL', description: 'The perfect everyday regular fit crewneck t-shirt.', image: '/Regular outfit.jpg', images: ['/Regular outfit.jpg'], countInStock: 30, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }, { name: 'Grey', hex: '#808080' }], user: adminUser
      },
      {
        name: 'Straight Leg Denim', price: 2100, category: 'Pants', collectionName: 'regulars', brand: 'THUKIL', description: 'Classic straight leg jeans with a medium wash.', image: '/trouser_back.png', images: ['/trouser_back.png'], countInStock: 15, sizes: ['30', '32', '34', '36'], colors: [{ name: 'Indigo', hex: '#4B0082' }, { name: 'Light Blue', hex: '#ADD8E6' }], user: adminUser
      },
      {
        name: 'Oxford Button Down', price: 1600, category: 'Shirts', collectionName: 'regulars', brand: 'THUKIL', description: 'Crisp cotton oxford shirt for a smart-casual wardrobe.', image: '/regular -1.jpg', images: ['/regular -1.jpg'], countInStock: 18, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Light Blue', hex: '#ADD8E6' }], user: adminUser
      },
      {
        name: 'Everyday Chinos', price: 1900, category: 'Pants', collectionName: 'regulars', brand: 'THUKIL', description: 'Versatile cotton twill chinos tailored for a perfect regular fit.', image: '/Regular outfit.jpg', images: ['/Regular outfit.jpg'], countInStock: 22, sizes: ['30', '32', '34', '36'], colors: [{ name: 'Khaki', hex: '#F0E68C' }, { name: 'Navy', hex: '#000080' }], user: adminUser
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroy data logic could go here
} else {
  importData();
}
