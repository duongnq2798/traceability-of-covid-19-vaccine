import { Document } from 'mongoose';

export interface User extends Document {
  userAddress: string;
  name: string;
  contactNo: string;
  role: string;
  isActive: boolean;
  profileHash: string;
  from: string
  to: string
  status: string
  transactionHash: string
  blockHash: string
  blockNumber: string
  confirmations: string
  byzantium: string
  transactionIndex: string
  contractAddress: string
  createdAt: Date
}
