import OrderItem from '../models/OrderItem.js';

// Get all items for a given order
export const getOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;
    const items = await OrderItem.find({ order_id: Number(orderId) });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
