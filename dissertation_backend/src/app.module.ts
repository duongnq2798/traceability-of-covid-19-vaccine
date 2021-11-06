import "dotenv/config";
import { Module } from '@nestjs/common';
import { MongooseModule,  } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureModule } from './modules/temperature/temperature.module';
import { ProcessModule } from './modules/process/process.module';
import { WarehouseModule } from "./modules/warehouse/warehouse.module";
import { DistributorModule } from "./modules/distributor/distributor.module";
import { VaccinationstationModule } from "./modules/vaccinationstation/vaccinationstation.module";
import { ObjectinjectionModule } from "./modules/objectinjection/objectinjection.module";
import { GeneralModule } from "./modules/general/general.module";
import { UserModule } from "./modules/user/user.module";


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
    ),
    TemperatureModule,
    ProcessModule,
    WarehouseModule,
    DistributorModule,
    VaccinationstationModule,
    ObjectinjectionModule,
    GeneralModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 