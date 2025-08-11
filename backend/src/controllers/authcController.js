// backend/src/controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signinUser = async (req, res) => {
  const { email, password } = req.body;
  
  // 1) User authentication logic (Check if user exists and password matches)
  const user = await User.findOne({ email });
  if (!user || !user.matchPassword(password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // 2) Create JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // 3) Token response
  res.json({ token });
};
