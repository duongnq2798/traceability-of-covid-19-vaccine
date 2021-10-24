import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessSchema } from '../../models/process.schema';
import { COLLECTION } from '../../configs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COLLECTION.PROCESS, schema: ProcessSchema },
    ]),
  ],
  providers: [ProcessService],
  controllers: [ProcessController],
  exports: [ProcessService],
})
export class ProcessModule {}
