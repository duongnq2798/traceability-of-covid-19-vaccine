import { Document } from 'mongoose';

export interface Distributor extends Document {
  batchNo: string;
  shippingName: string;
  quantity: string;
  departureDateTime: string;
  estimateDateTime: string;
  distributorId: string;
  optimumTemp: string;
  optimumHum: string;
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
