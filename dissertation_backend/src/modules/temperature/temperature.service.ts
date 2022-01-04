import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Temperature } from '../../types/temperature.type';
import { COLLECTION } from '../../configs';

@Injectable()
export class TemperatureService {
  constructor(
    @InjectModel(COLLECTION.TEMPERATURE)
    private temperatureModel: Model<Temperature>,
  ) {}

  async createTemp(payload: any): Promise<any> {
    console.log(payload)
    try {
      await this.temperatureModel.create({ ...payload });
    } catch (error) {
      throw new Error(error);
    }
  }

  getAll() {
    return this.temperatureModel.find();
  }

  async removeAll() {
    await this.temperatureModel.deleteMany({});
  }
}
