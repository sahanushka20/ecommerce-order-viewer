import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import dotenv from 'dotenv';
import DistributionCenter from '../models/DistributionCenter.js';
import { connectDB } from '../config/db.js';

dotenv.config({ path: path.resolve('./.env') });

const importDistributionCenters = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected for distribution centers import');

    const centers = [];

    fs.createReadStream(path.resolve('data/distribution_centers.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        centers.push({
          id: Number(row.id),
          name: row.name,
          latitude: Number(row.latitude),
          longitude: Number(row.longitude),
        });
      })
      .on('end', async () => {
        console.log('Distribution centers CSV parsed');
        await DistributionCenter.insertMany(centers);
        console.log('Distribution centers data imported successfully!');
        process.exit();
      });
  } catch (error) {
    console.error('Error importing distribution centers:', error);
    process.exit(1);
  }
};

importDistributionCenters();
