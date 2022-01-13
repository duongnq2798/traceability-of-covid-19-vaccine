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
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  status: {
    type: String,
  },
  transactionHash: {
    type: String,
  },
  blockHash: {
    type: String,
  },
  blockNumber: {
    type: String,
  },
  confirmations: {
    type: String,
  },
  byzantium: {
    type: String,
  },
  transactionIndex: {
    type: String,
  },
  contractAddress: {
    type: String,
  },
  ipfsLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'User' });
