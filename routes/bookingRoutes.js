const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { newBooking } = require('../controllers/newBooking');
const { getBookings } = require('../controllers/getBookings');

// Create a new booking (protected route)
router.post('/', authenticateToken, newBooking);

// Get all bookings for a user (protected route)
router.get('/user/getBookings', authenticateToken, getBookings);

module.exports = router;