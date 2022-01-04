import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timeline } from '../../types/timeline.type';
import { COLLECTION } from '../../configs';
import { ObjectId } from 'bson';

@Injectable()
export class TimelineService {
  constructor(
    @InjectModel(COLLECTION.TIMELINE)
    private timelineModel: Model<Timeline>,
  ) {}

  async searchProcess(keyword: string) {
    try {
      const result = await this.timelineModel
        .find({
          $or: [
            { batchNo: { $regex: keyword, $options: 'i' } },
          ],
        })
        .limit(1);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProcess(payload: any) {
    try {
      const { batchNo, warehouse, distributor, station, person } = payload;
      let timeline: any = await this.timelineModel.findOne({
        batchNo,
      });

      if (timeline && Object.keys(timeline).length > 0) {
        await this.timelineModel.updateOne(
          { batchNo: batchNo },
          { $set: { warehouse, distributor, station, person } },
        );
      } else {
        const entity = new this.timelineModel({
          _id: new ObjectId(),
          warehouse,
          distributor,
          station,
          person,
          batchNo,
        });

        const results = await entity.save();

        return results;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
