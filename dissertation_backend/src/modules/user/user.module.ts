import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../models/user.schema';
import { COLLECTION } from '../../configs';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: COLLECTION.USER, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
