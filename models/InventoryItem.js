import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  product_id: Number,  // Link to Product.id
  created_at: Date,
  sold_at: Date,
  cost: Number,
  product_category: String,
  product_name: String,
  product_brand: String,
  product_retail_price: Number,
  product_department: String,
  product_sku: String,
  product_distribution_center_id: Number,
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
export default InventoryItem;
