import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import dotenv from 'dotenv';
import InventoryItem from '../models/InventoryItem.js';
import { connectDB } from '../config/db.js';

dotenv.config({ path: path.resolve('./.env') });

const importInventoryItem = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected for inventory items import');

    const items = [];

    fs.createReadStream(path.resolve('data/inventory_items.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        items.push({
          id: Number(row.id),
          product_id: Number(row.product_id),
          created_at: row.created_at ? new Date(row.created_at) : null,
          sold_at: row.sold_at ? new Date(row.sold_at) : null,
          cost: Number(row.cost),
          product_category: row.product_category,
          product_name: row.product_name,
          product_brand: row.product_brand,
          product_retail_price: Number(row.product_retail_price),
          product_department: row.product_department,
          product_sku: row.product_sku,
          product_distribution_center_id: Number(row.product_distribution_center_id),
        });
      })
      .on('end', async () => {
        console.log('Inventory items CSV parsed');
        await InventoryItem.insertMany(items);
        console.log('Inventory items data imported successfully!');
        process.exit();
      });
  } catch (error) {
    console.error('Error importing inventory items:', error);
    process.exit(1);
  }
};

importInventoryItem();
