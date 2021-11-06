import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userAddress: {
    type: String,
  },
  name: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  role: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  profileHash: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'User' });
