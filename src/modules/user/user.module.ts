import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TaskModule } from '../task/task.module';
import { TaskService } from '../task/task.service';
import { StatusService } from '../status/status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { TaskEntity } from '../task/task.entity';
import { StatusEntity } from '../status/status.entity';

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([UserEntity, TaskEntity,StatusEntity])],
  controllers: [UserController],
  providers: [UserService, TaskService, StatusService],
})
export class UserModule {}
