import { Document } from 'mongoose';

export interface Process extends Document {
  batchNo: string;
  producer: string;
  totalWeight: string;
  optimumRangeHum: string;
  optimumRangeTemp: string;
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
  ipfsLink: string;
  createdAt: Date;
}
