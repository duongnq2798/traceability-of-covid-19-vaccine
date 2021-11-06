import { Document } from 'mongoose';

export interface Process extends Document {
  warehouse: boolean;
  distributor: boolean;
  station: boolean;
  person: boolean;
  createdAt: Date
}
