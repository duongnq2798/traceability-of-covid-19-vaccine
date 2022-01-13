import { Document } from 'mongoose';

export interface ObjectInjection extends Document {
  batchNo: string;
  personName: string;
  age: string;
  identityCard: string;
  numberOfVaccinations: string;
  vaccinationDate: string;
  typeOfVaccine: string;
  phoneNumber: string;
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
