import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './implementation/services/auth.service';
import { UserBaseModule } from '@features/user/modules/user.module';
import { RtStrategy } from '@core/strategies/rt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    UserBaseModule,
  ],
  controllers: [AuthController],
  providers: [
    RtStrategy,
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
})
export class AuthBaseModule {}
