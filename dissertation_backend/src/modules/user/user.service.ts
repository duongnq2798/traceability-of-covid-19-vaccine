import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../types/user.type';
import { COLLECTION, NEXT_ACCTION } from '../../configs';
import { ObjectId } from 'bson';
import { userrole } from '../../constants/data/userole.data';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(COLLECTION.USER)
    private userModel: Model<User>,
  ) {}

  async getUserRole() {
    return userrole;
  }

  async searchProcess(keyword: string) {
    try {
      const result = await this.userModel
        .find({
          $or: [{ transactionHash: { $regex: keyword, $options: 'i' } }],
        })
        .limit(1);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async countDocuments() {
    try {
      const result = await this.userModel.countDocuments();

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
      const result = await this.userModel
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

  async createProcess(payload: any) {
    const {
      userAddress,
      name,
      contactNo,
      role,
      isActive,
      profileHash,
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
      ipfsLink
    } = payload;
    const entity = new this.userModel({
      _id: new ObjectId(),
      userAddress,
      name,
      contactNo,
      role,
      isActive,
      profileHash,
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
      ipfsLink
    });

    const results = await entity.save();

    return results;
  }
}
