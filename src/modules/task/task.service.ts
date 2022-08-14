import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEntity } from '../status/status.entity';
import { TaskEntity } from '../task/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(StatusEntity)
    private stateRepository: Repository<StatusEntity>,
  ) { }
  

  async allTasks() {
    return await this.taskRepository.find({ relations: { status: true } });
  }
  async oneTask(id: number) {
    return await this.taskRepository.find({ where: { id },relations: { status: true }});
  }

  async addTask(taskDetails: { title: string; userId: number })
  {
    const newState = this.stateRepository.create();
    await this.stateRepository.save(newState)
    const newTask = this.taskRepository.create({title: taskDetails.title,user: taskDetails.userId,status: newState.id,});
    await this.taskRepository.save(newTask)
    return newTask
  }

  async updateTask(id: number, title: string) {
    return await this.taskRepository.update(id, { title: title });
  }
  async deleteTask(id: number) {
    return await this.taskRepository.delete(id);
  }
}
