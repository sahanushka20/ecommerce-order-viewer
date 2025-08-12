import express from 'express';
import { getUsers, getUserOrders } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);                // GET /api/users?search=...
router.get('/:userId/orders', getUserOrders); // GET /api/users/:userId/orders

export default router;
