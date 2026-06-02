import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from '@core/guards/access-token.guard';
import { AtStrategy } from '@core/strategies/at.strategy';
import { CategoryBaseModule } from '@features/categories/modules/category.module';
import { UserBaseModule } from '@features/user/modules/user.module';
import { AuthBaseModule } from '@features/auth/modules/auth.module';
import { GoalBaseModule } from '@features/goals/modules/goal.module';
import { DashboardBaseModule } from '@features/dashboard/modules/dashboard.module';
import { StatisticsBaseModule } from '@features/statistics/modules/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      ignoreEnvFile: false,
      expandVariables: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    CategoryBaseModule,
    UserBaseModule,
    AuthBaseModule,
    GoalBaseModule,
    DashboardBaseModule,
    StatisticsBaseModule,
  ],
  providers: [
    AtStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
