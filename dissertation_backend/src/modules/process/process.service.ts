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
            { transactionHash: { $regex: keyword, $options: 'i' } },
          ],
        })
        .limit(1);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countDocuments() {
    try {
      const result = await this.processModel
        .countDocuments();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllProcess(currentPage, perPage) {
    try {
      let perPageBar = Number(perPage) || 10;
      let pageX = Number(currentPage) || 1;

      const totalItems = await this.countDocuments();
      const result = await this.processModel
        .find()
        .sort({ createdAt: -1})
        .skip(perPageBar * pageX - perPageBar)
        .limit(perPageBar);
      return {
        totalItems,
        result
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProcess(payload: any) {
    const {
      batchNo,
      producer,
      totalWeight,
      optimumRangeHum,
      optimumRangeTemp,
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
      ipfsLink
    } = payload;
    const entity = new this.processModel({
      _id: new ObjectId(),
      batchNo,
      producer,
      totalWeight,
      optimumRangeHum,
      optimumRangeTemp,
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
      ipfsLink
    });

    const results = await entity.save();

    return results;
  }
}
