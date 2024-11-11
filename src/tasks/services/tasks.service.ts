import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) { }

    // Método para crear una nueva tarea
    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const task = this.tasksRepository.create(createTaskDto);
            return await this.tasksRepository.save(task);
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Error al crear la tarea.');
        }
    }

    // Método para listar tareas con paginado
    async findAll(page: number, limit: number): Promise<Task[]> {
        try {
            
            return await this.tasksRepository.find({
                skip: (page - 1) * limit,
                take: limit,
            });
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Error al obtener la lista de tareas.');
        }
    }

    // Método para obtener una tarea específica
    async findOne(id: number): Promise<Task> {
        try {
            const task = await this.tasksRepository.findOne({
                where: { id },
            });
            if (!task) {
                throw new NotFoundException(`Tarea con ID=${id} no encontrada.`);
            }
            return task;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error al buscar la tarea con ID ${id}.`);
        }
    }

    // Método para actualizar una tarea
    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        try {
            await this.tasksRepository.update(id, updateTaskDto);
            const updatedTask = await this.findOne(id);
            return updatedTask;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error al actualizar la tarea con ID ${id}.`);
        }
    }

    // Método para eliminar una tarea
    async remove(id: number): Promise<void> {
        try {
            const task = await this.findOne(id);
            await this.tasksRepository.remove(task);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Error al eliminar la tarea con ID ${id}.`);
        }
    }
}
