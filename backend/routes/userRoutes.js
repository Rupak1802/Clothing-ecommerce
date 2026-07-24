const express = require('express');
const router = express.Router();
const { authUser, registerUser, verifyOTP, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
