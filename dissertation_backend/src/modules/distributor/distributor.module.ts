import { Module } from '@nestjs/common';
import { DistributorController } from './distributor.controller';
import { DistributorService } from './distributor.service';

@Module({
  controllers: [DistributorController],
  providers: [DistributorService]
})
export class DistributorModule {}
