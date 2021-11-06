import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Distributor } from '../../types/distributor.type';
import { COLLECTION, NEXT_ACCTION } from '../../configs';
import { ObjectId } from 'bson';
import { TimelineService } from '../timeline/timeline.service';

@Injectable()
export class DistributorService {
  constructor(
    @InjectModel(COLLECTION.DISTRIBUTOR)
    private distributorModel: Model<Distributor>,
    private timelineService: TimelineService,
  ) {}

  async searchDistributor(keyword: string) {
    try {
      const result = await this.distributorModel
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
      const result = await this.distributorModel.countDocuments();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllDistributor(currentPage, perPage) {
    try {
      let perPageBar = Number(perPage) || 10;
      let pageX = Number(currentPage) || 1;

      const totalItems = await this.countDocuments();
      const result = await this.distributorModel
        .find()
        .skip(perPageBar * pageX - perPageBar)
        .limit(perPageBar);

      return {
        totalItems,
        result,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createDistributor(payload: any) {
    const {
      batchNo,
      shippingName,
      shippingNo,
      quantity,
      departureDateTime,
      estimateDateTime,
      distributorId,
      optimumTemp,
      optimumHum,
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
      nextAcction = NEXT_ACCTION.VACCINATION_STATION,
    } = payload;
    const entity = new this.distributorModel({
      _id: new ObjectId(),
      batchNo,
      shippingName,
      shippingNo,
      quantity,
      departureDateTime,
      estimateDateTime,
      distributorId,
      optimumTemp,
      optimumHum,
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
    await this.timelineService.createProcess({
      batchNo,
      warehouse: true,
      distributor: true,
      station: false,
      person: false,
    });

    const results = await entity.save();

    return results;
  }
}
