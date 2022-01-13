import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VaccinationStation } from '../../types/vaccinationstation.type';
import { COLLECTION, NEXT_ACCTION } from '../../configs';
import { ObjectId } from 'bson';
import { TimelineService } from '../timeline/timeline.service';

@Injectable()
export class VaccinationstationService {
  constructor(
    @InjectModel(COLLECTION.VACCINATION_STATIONS)
    private vaccinationStationModel: Model<VaccinationStation>,
    private timelineService: TimelineService,
  ) {}

  async searchVaccinationStation(keyword: string) {
    try {
      const result = await this.vaccinationStationModel
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
      const result = await this.vaccinationStationModel.countDocuments();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countSuccess() {
    try {
      const result = await this.vaccinationStationModel.countDocuments({
        status: "SUCCESS"
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countUnSuccess() {
    try {
      const result = await this.vaccinationStationModel.countDocuments({
        status: "UNSUCCESS"
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllVaccinationStation(currentPage, perPage) {
    try {
      let perPageBar = Number(perPage) || 10;
      let pageX = Number(currentPage) || 1;

      const totalItems = await this.countDocuments();
      const result = await this.vaccinationStationModel
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

  async createVaccinationStation(payload: any) {
    const {
      batchNo,
      quantity,
      arrivalDateTime,
      vaccinationStationId,
      shippingName,
      shippingNo,
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
      locationAddress,
      nextAcction = NEXT_ACCTION.OBJECT_INJECTION,
      ipfsLink
    } = payload;
    const entity = new this.vaccinationStationModel({
      _id: new ObjectId(),
      batchNo,
      quantity,
      arrivalDateTime,
      vaccinationStationId,
      shippingName,
      shippingNo,
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
      locationAddress,
      ipfsLink
    });
    await this.timelineService.createProcess({
      batchNo,
      warehouse: true,
      distributor: true,
      station: true,
      person: false,
    });

    const results = await entity.save();

    return results;
  }
}
