import { Module } from '@nestjs/common';
import { VaccinationstationController } from './vaccinationstation.controller';
import { VaccinationstationService } from './vaccinationstation.service';

@Module({
  controllers: [VaccinationstationController],
  providers: [VaccinationstationService]
})
export class VaccinationstationModule {}
