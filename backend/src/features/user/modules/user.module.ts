import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@features/user/domains/schemas/user.schema';
import { UserController } from './controllers/user.controller';
import { UserService } from './implementation/services/user.service';
import { UserRepository } from './implementation/repositories/user.repository';
import { UserMapper } from './implementation/mappers/user.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserMapper,
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['IUserService', 'IUserRepository'],
})
export class UserBaseModule {}
