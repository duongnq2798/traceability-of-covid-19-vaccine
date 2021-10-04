import { Module } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureSchema } from '../../models/temperature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Temperature', schema: TemperatureSchema },
    ])
  ],
  providers: [TemperatureService],
  controllers: [TemperatureController],
})
export class TemperatureModule {}
