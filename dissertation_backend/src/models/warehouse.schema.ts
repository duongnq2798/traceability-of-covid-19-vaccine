import * as mongoose from 'mongoose';

export const WarehouseSchema = new mongoose.Schema({
  batchNo: {
    type: String,
  },
  vaccineName: {
    type: String,
  },
  quantity: {
    type: String,
  },
  optimumRangeTemp: {
    type: String,
  },
  optimumRangeHum: {
    type: String,
  },
  locationAddress: {
    type: String,
  },
  isViolation: {
    type: Boolean,
  },
  storageDate: {
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
}, { collection: 'Warehouse' });
