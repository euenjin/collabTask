// routes/signUpRoutes.js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import  validateTeamDept  from '../middlewares/validateTeamDept.js'; 

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

router.post('/signup', validateTeamDept, async (req, res) => {
  // normalize email/password server-side too
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  const password = String(req.body?.password ?? '').trim();
  const { team = 'Solo', department = 'Solo' } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // NOTE: assume your User model hashes the password in a pre-save hook.
    const user = new User({ email, password, team, department });
    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      team: user.team,
      department: user.department,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
