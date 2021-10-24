import { Module } from '@nestjs/common';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseSchema } from '../../models/warehouse.schema';
import { COLLECTION } from '../../configs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COLLECTION.WAREHOUSE, schema: WarehouseSchema },
    ]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService],
})
export class WarehouseModule {}
