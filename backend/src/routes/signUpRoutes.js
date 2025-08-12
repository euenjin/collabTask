import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

router.post('/signup', async (req, res) => {
  const { email, password, team = 'solo', department = 'solo' } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ email, password, team, department });    // Defined in User model, and it is an instance of User
    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,                   //OOP property
      team: user.team,
      department: user.department,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
