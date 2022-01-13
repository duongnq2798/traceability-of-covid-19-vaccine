import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectInjection } from '../../types/objectinjection.type';
import { COLLECTION, NEXT_ACCTION } from '../../configs';
import { ObjectId } from 'bson';
import { TimelineService } from '../timeline/timeline.service';

@Injectable()
export class ObjectinjectionService {
  constructor(
    @InjectModel(COLLECTION.OBJECT_INJECTION)
    private objectInjectionModel: Model<ObjectInjection>,
    private timelineService: TimelineService,
  ) {}

  async searchObjectInjection(keyword: string) {
    try {
      const result = await this.objectInjectionModel
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
      const result = await this.objectInjectionModel.countDocuments();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  
  async countSuccess() {
    try {
      const result = await this.objectInjectionModel.countDocuments({
        status: "SUCCESS"
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countUnSuccess() {
    try {
      const result = await this.objectInjectionModel.countDocuments({
        status: "UNSUCCESS"
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllPObjectInjection(currentPage, perPage) {
    try {
      let perPageBar = Number(perPage) || 10;
      let pageX = Number(currentPage) || 1;

      const totalItems = await this.countDocuments();
      const result = await this.objectInjectionModel
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

  async createObjectInjection(payload: any) {
    const {
      batchNo,
      personName,
      age,
      identityCard,
      numberOfVaccinations,
      vaccinationDate,
      typeOfVaccine,
      phoneNumber,
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
      nextAcction = NEXT_ACCTION.DONE,
      ipfsLink
    } = payload;
    const entity = new this.objectInjectionModel({
      _id: new ObjectId(),
      batchNo,
      personName,
      age,
      identityCard,
      numberOfVaccinations,
      vaccinationDate,
      typeOfVaccine,
      phoneNumber,
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
      distributor: true,
      station: true,
      person: true,
    });

    const results = await entity.save();

    return results;
  }
}
