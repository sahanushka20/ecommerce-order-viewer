import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: { type: Number, unique: true },
  user_id: Number, // Link to User.id
  status: String,
  gender: String,
  created_at: Date,
  returned_at: Date,
  shipped_at: Date,
  delivered_at: Date,
  num_of_item: Number,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
