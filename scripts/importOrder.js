import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import { connectDB } from '../config/db.js';

dotenv.config({ path: path.resolve('./.env') });

const importOrders = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected for order import');

    const orders = [];

    fs.createReadStream(path.resolve('data/orders.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        orders.push({
          order_id: Number(row.order_id),
          user_id: Number(row.user_id),
          status: row.status,
          gender: row.gender,
          created_at: row.created_at ? new Date(row.created_at) : null,
          returned_at: row.returned_at ? new Date(row.returned_at) : null,
          shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
          delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
          num_of_item: Number(row.num_of_item),
        });
      })
      .on('end', async () => {
        console.log('Orders CSV parsed');
        await Order.insertMany(orders);
        console.log('Order data imported successfully!');
        process.exit();
      });
  } catch (error) {
    console.error('Error importing orders:', error);
    process.exit(1);
  }
};

importOrders();
