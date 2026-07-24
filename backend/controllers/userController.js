const User = require('../models/User');
const OTP = require('../models/OTP');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  // allow searching by either email or phone
  const user = await User.findOne({ $or: [{ email }, { phone: email }] });

  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      res.status(401);
      throw new Error('Please verify your email to login');
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    if (userExists.isVerified) {
      res.status(400);
      throw new Error('User already exists');
    } else {
      // If user exists but not verified, we can update their info and resend OTP
      userExists.name = name;
      userExists.phone = phone;
      userExists.password = password;
      await userExists.save();
    }
  } else {
    await User.create({ name, email, phone, password, isVerified: false });
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP in db (delete old ones for this email first)
  await OTP.deleteMany({ email });
  await OTP.create({ email, otp });

  // Send Email
  try {
    await sendEmail({
      email: email,
      subject: 'AURA studio - Verify your account',
      html: `<h1>Account Verification</h1>
             <p>Your OTP for registration is: <strong>${otp}</strong></p>
             <p>It will expire in 5 minutes.</p>`
    });
    res.status(200).json({ message: 'OTP sent to email', email });
  } catch (error) {
    await OTP.deleteMany({ email });
    res.status(500);
    throw new Error('Error sending email');
  }
};

// @desc    Verify OTP and finalize registration
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const validOTP = await OTP.findOne({ email, otp });
  
  if (!validOTP) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  user.isVerified = true;
  await user.save();
  await OTP.deleteMany({ email });

  // Send Welcome Email
  try {
    await sendEmail({
      email: email,
      subject: 'Welcome to AURA studio!',
      html: `<h1>Welcome ${user.name}!</h1>
             <p>Your account has been successfully verified.</p>
             <p>Enjoy shopping with us.</p>`
    });
  } catch (error) {
    console.error("Welcome email error:", error);
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = { authUser, registerUser, verifyOTP, getUserProfile };
