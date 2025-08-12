import mongoose from 'mongoose';

const distributionCenterSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  latitude: Number,
  longitude: Number,
});

const DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema);
export default DistributionCenter;
