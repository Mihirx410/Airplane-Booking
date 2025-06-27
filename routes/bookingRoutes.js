import express from 'express';
import { createBooking, getMyBookings, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateJWT, createBooking);
router.get('/my', authenticateJWT, getMyBookings);
router.put('/:id', authenticateJWT, updateBooking);
router.delete('/:id', authenticateJWT, deleteBooking);

export default router; 