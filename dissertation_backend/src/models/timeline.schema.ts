import * as mongoose from 'mongoose';

export const TimelineSchema = new mongoose.Schema({
  batchNo: {
    type: String,
  },
  warehouse: {
    type: Boolean,
  },
  distributor: {
    type: Boolean,
  },
  station: {
    type: Boolean,
  },
  person: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'Timeline' });
