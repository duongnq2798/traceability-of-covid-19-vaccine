import { Module } from '@nestjs/common';
import { VaccinationstationController } from './vaccinationstation.controller';
import { VaccinationstationService } from './vaccinationstation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccinationStationSchema } from '../../models/vaccinationstation.schema';
import { COLLECTION } from '../../configs';
import { TimelineModule } from '../timeline/timeline.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COLLECTION.VACCINATION_STATIONS, schema: VaccinationStationSchema },
    ]),
    TimelineModule,
  ],
  controllers: [VaccinationstationController],
  providers: [VaccinationstationService],
  exports: [VaccinationstationService],
})
export class VaccinationstationModule {}
