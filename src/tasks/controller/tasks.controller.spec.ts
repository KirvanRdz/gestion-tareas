import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import {TaskStatus} from '../enums/task-status.enum'
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { PaginationDto } from '../dto/pagination.dto'; 
import { NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';

describe('TasksController', () => {
    let tasksController: TasksController;
    let tasksService: TasksService;
    // Configura el módulo de pruebas e inicializa el controlador y el servicio antes de cada prueba
    beforeEach(async () => {
        const mockTasksService = {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: mockTasksService,
                },
            ],
        }).compile();

        tasksController = module.get<TasksController>(TasksController);
        tasksService = module.get<TasksService>(TasksService);
    });

    // Prueba para el endpoint de creación de una tarea
    describe('create', () => {
        it('debe crear y retornar una nueva tarea', async () => {
            // Datos de prueba para la tarea
            const createTaskDto: CreateTaskDto = {
                titulo: 'Tarea de prueba',
                estado: TaskStatus.PENDING
            };
            const task: Task = {
                id: 1,
                ...createTaskDto,
                descripcion: 'Descripción de prueba',
                fecha_vencimiento: '2024-12-01'
            };

            // Mock del método create del servicio para devolver la tarea simulada
            jest.spyOn(tasksService, 'create').mockResolvedValue(task);

            // Llama al método del controlador y verifica el resultado
            const result = await tasksController.create(createTaskDto);
            expect(result).toEqual({ message: 'Tarea creada', data: task });
            expect(tasksService.create).toHaveBeenCalledWith(createTaskDto);
        });

        it('debería lanzar una excepción si falla la creación de la tarea', async () => {
            const createTaskDto: CreateTaskDto = {
                titulo: 'Tarea de prueba',
                estado: TaskStatus.PENDING,
            };

            jest.spyOn(tasksService, 'create').mockRejectedValue(new InternalServerErrorException());

            await expect(tasksController.create(createTaskDto)).rejects.toThrow(InternalServerErrorException);
        });
    });

    // Prueba para el endpoint de listado de tareas con paginación
    describe('findAll', () => {
        it('debe retornar una lista de tareas paginada', async () => {
            // Datos de prueba para la lista de tareas
            const tasks: Task[] = [
                { id: 1, titulo: 'Tarea 1', estado: TaskStatus.PENDING, descripcion: 'Desc 1', fecha_vencimiento: '2024-12-01' },
                { id: 2, titulo: 'Tarea 2', estado: TaskStatus.COMPLETED, descripcion: 'Desc 2', fecha_vencimiento: '2024-12-05' },
            ];

            // Mock del método findAll del servicio para devolver las tareas simuladas
            jest.spyOn(tasksService, 'findAll').mockResolvedValue(tasks);

            // Crea el PaginationDto
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            // Llama al método del controlador y verifica el resultado
            const result = await tasksController.findAll(paginationDto);
            expect(result).toEqual({ message: 'Tareas encontradas', data: tasks });
            expect(tasksService.findAll).toHaveBeenCalledWith(1, 10);
        });

        it('debe retornar un mensaje cuando no haya tareas registradas', async () => {
            // Mock del método findAll del servicio para devolver una lista vacía
            jest.spyOn(tasksService, 'findAll').mockResolvedValue([]);
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            // Llama al método del controlador y verifica el resultado
            const result = await tasksController.findAll(paginationDto);
            expect(result).toEqual({ message: 'No hay tareas registradas', data: [] });
        });

        it('debería lanzar una excepción si falla la obtención de la lista de tareas', async () => {
            jest.spyOn(tasksService, 'findAll').mockRejectedValue(new InternalServerErrorException());
            const paginationDto: PaginationDto = { page: 1, limit: 10 };
            await expect(tasksController.findAll(paginationDto)).rejects.toThrow(InternalServerErrorException);
        });

       
    });

    // Prueba para el endpoint de obtención de una tarea específica por ID
    describe('findOne', () => {
        it('debe retornar una tarea cuando se proporciona un ID válido', async () => {
            const task: Task = {
                id: 1,
                titulo: 'Tarea de prueba',
                estado: TaskStatus.PENDING,
                descripcion: 'Descripción de prueba',
                fecha_vencimiento: '2024-12-01'
            };

            // Mock del método findOne del servicio para devolver la tarea simulada
            jest.spyOn(tasksService, 'findOne').mockResolvedValue(task);

            // Llama al método del controlador y verifica el resultado
            const result = await tasksController.findOne(1);
            expect(result).toEqual({ message: 'Tarea encontrada', data: task });
            expect(tasksService.findOne).toHaveBeenCalledWith(1);
        });

        it('debe lanzar NotFoundException si no se encuentra la tarea', async () => {
            // Mock del método findOne del servicio para lanzar una excepción NotFoundException
            jest.spyOn(tasksService, 'findOne').mockRejectedValue(new NotFoundException());

            // Verifica que la excepción se lanza al llamar al método
            await expect(tasksController.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    // Prueba para el endpoint de actualización de una tarea
    describe('update', () => {
        it('debe actualizar y retornar la tarea actualizada', async () => {
            // Datos de prueba para la tarea actualizada
            const updateTaskDto: UpdateTaskDto = {
                titulo: 'Tarea actualizada',
                descripcion: 'Descripción actualizada'
            };
            const task: Task = {
                id: 1,
                titulo: 'Tarea actualizada',
                estado: TaskStatus.PENDING,
                descripcion: 'Descripción actualizada',
                fecha_vencimiento: '2024-12-01'
            };

            // Mock del método update del servicio para devolver la tarea actualizada
            jest.spyOn(tasksService, 'update').mockResolvedValue(task);

            // Llama al método del controlador y verifica el resultado
            const result = await tasksController.update(1, updateTaskDto);
            expect(result).toEqual({ message: 'Tarea actualizada', data: task });
            expect(tasksService.update).toHaveBeenCalledWith(1, updateTaskDto);
        });

        it('debe lanzar NotFoundException si la tarea a actualizar no existe', async () => {
            // Mock del método update del servicio para lanzar una excepción NotFoundException
            jest.spyOn(tasksService, 'update').mockRejectedValue(new NotFoundException());

            // Verifica que la excepción se lanza al llamar al método
            await expect(tasksController.update(999, {} as UpdateTaskDto)).rejects.toThrow(NotFoundException);
        });
    });

    // Prueba para el endpoint de eliminación de una tarea
    describe('remove', () => {
        it('debe eliminar una tarea y retornar un mensaje de confirmación', async () => {
            // Mock del método remove del servicio para simular eliminación exitosa
            jest.spyOn(tasksService, 'remove').mockResolvedValue();

            // Llama al método del controlador y verifica el resultado
            const result = await tasksController.remove(1);
            expect(result).toEqual({ message: 'Tarea eliminada' });
            expect(tasksService.remove).toHaveBeenCalledWith(1);
        });

        it('debe lanzar NotFoundException si la tarea a eliminar no existe', async () => {
            // Mock del método remove del servicio para lanzar una excepción NotFoundException
            jest.spyOn(tasksService, 'remove').mockRejectedValue(new NotFoundException());

            // Verifica que la excepción se lanza al llamar al método
            await expect(tasksController.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
