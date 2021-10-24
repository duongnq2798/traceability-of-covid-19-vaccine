import { Module } from '@nestjs/common';
import { ObjectinjectionController } from './objectinjection.controller';
import { ObjectinjectionService } from './objectinjection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectionInjectionSchema } from '../../models/objectinjection.schema';
import { COLLECTION } from '../../configs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COLLECTION.OBJECT_INJECTION, schema: ObjectionInjectionSchema },
    ]),
  ],
  controllers: [ObjectinjectionController],
  providers: [ObjectinjectionService],
  exports: [ObjectinjectionService]
})
export class ObjectinjectionModule {}
