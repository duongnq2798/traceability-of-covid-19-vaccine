import { Document } from 'mongoose';

export interface Warehouse extends Document {
  batchNo: string;
  vaccineName: string;
  quantity: string;
  price: string;
  optimumTemp: string;
  storageDate: string;
  isViolation: string;
  from: string;
  to: string;
  status: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  byzantium: string;
  transactionIndex: string;
  contractAddress: string;
  nextAcction: string;
  createdAt: Date;
}
