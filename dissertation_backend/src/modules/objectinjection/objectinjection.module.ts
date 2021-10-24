import { Module } from '@nestjs/common';
import { ObjectinjectionController } from './objectinjection.controller';
import { ObjectinjectionService } from './objectinjection.service';

@Module({
  controllers: [ObjectinjectionController],
  providers: [ObjectinjectionService]
})
export class ObjectinjectionModule {}
