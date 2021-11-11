import * as mongoose from 'mongoose';

export const ObjectionInjectionSchema = new mongoose.Schema({
  batchNo: {
    type: String,
  },
  personName: {
    type: String,
  },
  age: {
    type: String,
  },
  identityCard: {
    type: String,
  },
  numberOfVaccinations: {
    type: String,
  },
  vaccinationDate: {
    type: String,
  },
  typeOfVaccine: {
    type: String,
  },
  phoneNumber: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'ObjectionInjection' });
