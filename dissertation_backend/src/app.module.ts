import { Module } from '@nestjs/common';
import { MongooseModule,  } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureModule } from './modules/temperature/temperature.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://root:datalakeagin@cluster0.f2em9.mongodb.net/k12system?retryWrites=true&w=majority`
    ),
    TemperatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
      // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 