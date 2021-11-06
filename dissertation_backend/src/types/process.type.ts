import { Document } from 'mongoose';

export interface Process extends Document {
  batchNo: string;
  producer: string;
  warehouse: string;
  distributor: string;
  vaccinationStation: string;
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
  createdAt: Date;
}
