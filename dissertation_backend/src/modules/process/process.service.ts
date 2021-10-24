import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Process } from '../../types/process.type';
import { COLLECTION, NEXT_ACCTION } from '../../configs';
import { ObjectId } from 'bson';

@Injectable()
export class ProcessService {
  constructor(
    @InjectModel(COLLECTION.PROCESS)
    private processModel: Model<Process>,
  ) {}

  async searchProcess(keyword: string) {
    try {
      const result = await this.processModel
        .find({
          $or: [
            { batchNo: { $regex: keyword, $options: 'i' } },
            { transactionHas: { $regex: keyword, $options: 'i' } },
          ],
        })
        .limit(5);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllProcess(payload: any) {
    try {
      const { currentPage, perPage } = payload;
      let perPageBar = Number(perPage) || 10;
      let pageX = Number(currentPage) || 1;

      const result = await this.processModel
        .find()
        .skip(perPageBar * pageX - perPageBar)
        .limit(perPageBar);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProcess(payload: any) {
    const {
      batchNo,
      producer,
      warehouse,
      distributor,
      vaccinationStation,
      totalWeight,
      from,
      to,
      status,
      transactionHash,
      blockHash,
      blockNumber,
      confirmations,
      byzantium,
      transactionIndex,
      contractAddress,
      nextAcction = NEXT_ACCTION.WAREHOUSER,
    } = payload;
    const entity = new this.processModel({
      _id: new ObjectId(),
      batchNo,
      producer,
      warehouse,
      distributor,
      vaccinationStation,
      totalWeight,
      from,
      to,
      status: status === 1 ? 'SUCCESS' : 'UNSUCCESS',
      transactionHash,
      blockHash,
      blockNumber,
      confirmations,
      byzantium,
      transactionIndex,
      contractAddress,
      nextAcction,
    });

    const results = await entity.save();

    return results;
  }
}
