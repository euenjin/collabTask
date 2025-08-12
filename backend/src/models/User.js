// backend/src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,                          // Email field
    required: true,
    unique: true,
  },

  password: {                              // Password field
    type: String,
    required: true,
  },

  team: {                                  // Team field
    type: String,
    default: 'Solo',                            // Default value is an empty string    NO group work available if team is not provided
  },

  department:{
    type: String,                          // Team field
    default: 'Solo',                            // Default value is an empty string
  },
  }, { timestamps: true }                     // Timestamps for createdAt and updatedAt
);

// Password Hashing Middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password Matching Method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
