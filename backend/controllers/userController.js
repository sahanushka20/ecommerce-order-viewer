import User from '../models/User.js';
import Order from '../models/Order.js';

// Search users by criteria (first name, last name, email)
export const getUsers = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = {
      $or: [
        { first_name: { $regex: search, $options: 'i' } },
        { last_name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };
    const users = await User.find(query).limit(20);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders for a given user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user_id: Number(userId) });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
