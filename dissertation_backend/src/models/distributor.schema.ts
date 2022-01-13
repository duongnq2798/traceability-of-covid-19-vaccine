import * as mongoose from 'mongoose';

export const DistributorSchema = new mongoose.Schema({
  batchNo: {
    type: String,
  },
  shippingName: {
    type: String,
  },
  shippingNo: {
    type: String,
  },
  quantity: {
    type: String,
  },
  departureDateTime: {
    type: String,
  },
  estimateDateTime: {
    type: String,
  },
  distributorId: {
    type: String,
  },
  optimumTemp: {
    type: String,
  },
  optimumHum: {
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
  nextAcction: {
    type: String,
  },
  ipfsLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'Distributor' });
