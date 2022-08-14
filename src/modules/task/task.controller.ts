import {Body,Controller,Delete,Get,Param,ParseIntPipe,Post,Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';

@ApiTags("tasks")
@Controller('tasks')
export class TaskController
{
  constructor(
    private readonly taskService: TaskService,
  ) { }
  
  //Get all Tasks
  //-----------------
  @Get()
  async allTasks() {
    return await this.taskService.allTasks();
  }

  //Get one Task
  //-----------------
  @Get(':id')
  async oneTask(@Param('id', ParseIntPipe) userId: number)
  {
    return await this.taskService.oneTask(userId);
  }

  //add new Task
  //-----------------
  @Post()
  async addTask(@Body() taskDetails: { title: string; userId: number })
  {
    return await this.taskService.addTask(taskDetails);
  }


  //update Task
  //-----------------
  @Put(':id')
  async updateTask(@Param('id', ParseIntPipe) id: number, @Body() title: string)
  {
    return await this.taskService.updateTask(id, title);
  }


  //delete Task
  //-----------------
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) userId: number)
  {
    return await this.taskService.deleteTask(userId);
  }
}
