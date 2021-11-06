import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseSchema } from '../../models/warehouse.schema';
import { COLLECTION } from '../../configs';
import { TimelineModule } from '../timeline/timeline.module';
import { TimelineSchema } from 'src/models/timeline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COLLECTION.WAREHOUSE, schema: WarehouseSchema },
      { name: COLLECTION.TIMELINE, schema: TimelineSchema },
    ]),
    TimelineModule
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService],
})
export class WarehouseModule {}
