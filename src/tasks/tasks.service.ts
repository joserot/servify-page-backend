import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { Task } from 'src/tasks/schema/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }
}
