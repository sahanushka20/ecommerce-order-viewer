import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

 

dotenv.config({ path: path.resolve('./.env') });
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

const importUsers = async () => {
  try {
    await connectDB();  
     
    console.log('MongoDB connected for import');

    const users = [];

    fs.createReadStream(path.resolve('data/users.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        users.push({
          id: Number(row.id),
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          age: row.age ? Number(row.age) : null,
          gender: row.gender,
          state: row.state,
          street_address: row.street_address,
          postal_code: row.postal_code,
          city: row.city,
          country: row.country,
          latitude: row.latitude ? Number(row.latitude) : null,
          longitude: row.longitude ? Number(row.longitude) : null,
          traffic_source: row.traffic_source,
          created_at: row.created_at ? new Date(row.created_at) : null,
        });
      })
      .on('end', async () => {
        console.log('CSV parsing finished');
        await User.insertMany(users);
        console.log('User data imported successfully!');
        process.exit();
      });
  } catch (error) {
    console.error('Error importing users:', error);
    process.exit(1);
  }
};

importUsers();
