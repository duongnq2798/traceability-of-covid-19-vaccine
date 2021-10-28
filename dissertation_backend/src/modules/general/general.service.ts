import { Injectable } from '@nestjs/common';
import { producer } from 'src/constants/data/producer.data';
import { distributor } from 'src/constants/data/distributor.data';
import { warehouse } from 'src/constants/data/warehouse.data';
@Injectable()
export class GeneralService {

    async getProducer () {
        return producer;
    }

    async getDistributor () {
        return distributor;
    }

    async getWarehouse () {
        return warehouse;
    }
}
