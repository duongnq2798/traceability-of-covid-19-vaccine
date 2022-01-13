import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Warehouse } from '../../types/warehouse.type';
import { COLLECTION, NEXT_ACCTION } from '../../configs';
import { ObjectId } from 'bson';
import { TimelineService } from '../timeline/timeline.service';
@Injectable()
export class WarehouseService {
  constructor(
    @InjectModel(COLLECTION.WAREHOUSE)
    private warehouseModel: Model<Warehouse>,
    private timelineService: TimelineService,
  ) {}

  async searchWarehouse(keyword: string) {
    try {
      const result = await this.warehouseModel
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
      const result = await this.warehouseModel.countDocuments();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countSuccess() {
    try {
      const result = await this.warehouseModel.countDocuments({
        status: "SUCCESS"
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countUnSuccess() {
    try {
      const result = await this.warehouseModel.countDocuments({
        status: "UNSUCCESS"
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllWarehouse(currentPage, perPage) {
    try {
      let perPageBar = Number(perPage) || 10;
      let pageX = Number(currentPage) || 1;

      const totalItems = await this.countDocuments();
      const result = await this.warehouseModel
        .find()
        .sort({ createdAt: -1})
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

  async createWarehouse(payload: any) {
    const {
      batchNo,
      vaccineName,
      quantity,
      optimumRangeTemp,
      optimumRangeHum,
      locationAddress,
      storageDate,
      isViolation,
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
      nextAcction = NEXT_ACCTION.DISTRIBUTOR,
      ipfsLink,
    } = payload;
    const entity = new this.warehouseModel({
      _id: new ObjectId(),
      batchNo,
      vaccineName,
      quantity,
      optimumRangeTemp,
      optimumRangeHum,
      locationAddress,
      storageDate,
      isViolation,
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
    await this.timelineService.createProcess({
      batchNo,
      warehouse: true,
      distributor: false,
      station: false,
      person: false,
    });
    const results = await entity.save();

    return results;
  }
}
