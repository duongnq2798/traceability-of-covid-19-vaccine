import { Document } from 'mongoose';

export interface VaccinationStation extends Document {
  batchNo: string;
  quantity: string;
  arrivalDateTime: string;
  vaccinationStationId: string;
  shippingName: string;
  shippingNo: string;
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
  locationAddress: string;
  ipfsLink: string;
  createdAt: Date;
}
