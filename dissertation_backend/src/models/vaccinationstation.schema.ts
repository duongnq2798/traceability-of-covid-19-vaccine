import * as mongoose from 'mongoose';

export const VaccinationStationSchema = new mongoose.Schema({
  batchNo: {
    type: String,
  },
  quantity: {
    type: String,
  },
  arrivalDateTime: {
    type: String,
  },
  vaccinationStationId: {
    type: String,
  },
  shippingName: {
    type: String,
  },
  shippingNo: {
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
  locationAddress: {
    type: String,
  },
  ipfsLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'VaccinationStation' });
