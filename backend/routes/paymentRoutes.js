import express from 'express';
import { processDummyPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Route: POST /api/payment
router.post('/', processDummyPayment);

export default router;
