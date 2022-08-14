import { StatusEntity } from '../status/status.entity';
import { TaskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { StatusService } from "../status/status.service";
import { TaskService } from "./task.service";
import { StatusModule } from "../status/status.module";


@Module({
    imports:[StatusModule,TypeOrmModule.forFeature([TaskEntity,StatusEntity])],
    controllers:[TaskController],
    providers:[TaskService,StatusService]
})

export class TaskModule{}