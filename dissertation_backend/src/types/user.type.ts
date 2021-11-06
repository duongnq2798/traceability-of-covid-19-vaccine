import { Document } from 'mongoose';

export interface User extends Document {
  userAddress: string;
  name: string;
  contactNo: string;
  role: string;
  isActive: boolean;
  profileHash: string;
  createdAt: Date;
}
