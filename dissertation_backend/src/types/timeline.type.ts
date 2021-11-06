import { Document } from 'mongoose';

export interface Timeline extends Document {
  batchNo: string;
  producer: boolean;
  warehouse: boolean;
  distributor: boolean;
  vaccinationStation: boolean;

  createdAt: Date
}
