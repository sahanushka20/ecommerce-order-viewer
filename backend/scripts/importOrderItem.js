import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import dotenv from 'dotenv';
import OrderItem from '../models/OrderItem.js';
import { connectDB } from '../config/db.js';

dotenv.config({ path: path.resolve('./.env') });

const importOrderItem = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected for order item import');

    const items = [];

    fs.createReadStream(path.resolve('data/order_items.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        items.push({
          id: Number(row.id),
          order_id: Number(row.order_id),
          user_id: Number(row.user_id),
          product_id: Number(row.product_id),
          inventory_item_id: Number(row.inventory_item_id),
          status: row.status,
          created_at: row.created_at ? new Date(row.created_at) : null,
          shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
          delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
          returned_at: row.returned_at ? new Date(row.returned_at) : null,
        });
      })
      .on('end', async () => {
        console.log('Order items CSV parsed');
        await OrderItem.insertMany(items);
        console.log('Order item data imported successfully!');
        process.exit();
      });
  } catch (error) {
    console.error('Error importing order items:', error);
    process.exit(1);
  }
};

importOrderItem();
