import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import { connectDB } from '../config/db.js';

dotenv.config({ path: path.resolve('./.env') });

const importProducts = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected for product import');

    const products = [];

    fs.createReadStream(path.resolve('data/products.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        products.push({
          id: Number(row.id),
          cost: Number(row.cost),
          category: row.category,
          name: row.name,
          brand: row.brand,
          retail_price: Number(row.retail_price),
          department: row.department,
          sku: row.sku,
          distribution_center_id: Number(row.distribution_center_id),
        });
      })
      .on('end', async () => {
        console.log('Products CSV parsed');
        await Product.insertMany(products);
        console.log('Product data imported successfully!');
        process.exit();
      });
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
};

importProducts();
