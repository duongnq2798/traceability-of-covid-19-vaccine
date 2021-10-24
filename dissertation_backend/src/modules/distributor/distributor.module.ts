import { Module } from '@nestjs/common';
import { DistributorController } from './distributor.controller';
import { DistributorService } from './distributor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DistributorSchema } from '../../models/distributor.schema';
import { COLLECTION } from '../../configs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COLLECTION.DISTRIBUTOR, schema: DistributorSchema },
    ]),
  ],
  controllers: [DistributorController],
  providers: [DistributorService],
  exports: [DistributorService],
})
export class DistributorModule {}
