import { Document } from 'mongoose';

export interface Temperature extends Document {
  temperature: string;
  humidity: string;
  sensorName: string;
  createdAt: Date;
}
