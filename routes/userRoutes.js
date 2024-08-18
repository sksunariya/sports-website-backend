const express = require('express');
const { registerUser, login } = require('../controllers/auth');
const router = express.Router();


// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', login);

module.exports = router;
