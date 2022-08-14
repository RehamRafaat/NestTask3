import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusEntity } from './modules/status/status.entity';
import { TaskEntity } from './modules/task/task.entity';
import { UserEntity } from './modules/user/user.entity';
import { LoggerMiddleware } from './middlwares/logger.middleware';
import { StatusModule } from './modules/status/status.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    TaskModule,
    StatusModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '22995621mM@',
      database: 'iti',
      synchronize: true,
      entities: [UserEntity, TaskEntity, StatusEntity],
    }),
    ConfigModule.forRoot({
      envFilePath:".env"
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
