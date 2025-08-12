import express from 'express';
import { getOrderItems } from '../controllers/orderController.js';

const router = express.Router();

router.get('/:orderId/items', getOrderItems);  // GET /api/orders/:orderId/items

export default router;
