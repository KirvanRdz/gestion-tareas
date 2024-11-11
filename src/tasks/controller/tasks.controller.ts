
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import {PaginationDto} from '../dto/pagination.dto'
import { Task } from '../entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { responsesSucces, responsesError } from '../../doc-swagger/tasks/swagger-tasks-responses';
import { createTaskDescription,getTasksDescription,
        getTaskDescription, updateTaskDescription,
        deleteTaskDescription} from '../../doc-swagger/tasks/swagger-tasks-description-endpoints';


@ApiTags('Tareas')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) // Protege todos los endpoints de este controlador
@Controller('api/tareas')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
 
  // Endpoint para crear una nueva tarea
  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea',description:createTaskDescription})
  @ApiResponse(responsesSucces.createTaskSuccess)
  @ApiResponse(responsesError.cretaeTaskBadRequest)
  @ApiResponse(responsesError.cretaeTaskServerError)
  @ApiResponse(responsesError.unauthorized)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<{ message: string; data: Task }> {
    const newTask = await this.tasksService.create(createTaskDto);
    return {
        message: 'Tarea creada',
        data: newTask,
      };
  }

  // Endpoint para listar tareas con paginado
  @Get()
  @ApiOperation({ summary: 'Obtener lista de tareas con paginado',description:getTasksDescription })
  @ApiResponse(responsesSucces.getAllTaskSuccess)
  @ApiResponse(responsesError.getAllTaskBadRequest)
  @ApiResponse(responsesError.getAllTaskServerError)
  @ApiResponse(responsesError.unauthorized)
  async findAll(
    @Query() paginationDto: PaginationDto
  ): Promise<{ message: string; data: Task[] }> {
    
    const page = paginationDto.page ?? 1; // Asigna 1 si page es undefined
    const limit = paginationDto.limit ?? 10; // Asigna 10 si limit es undefined
  
 
    const tasks = await this.tasksService.findAll(page, limit);

    return {
      message: tasks.length > 0 ? 'Tareas encontradas' : 'No hay tareas registradas',
      data: tasks,
    };
  }

  // Endpoint para obtener una tarea
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea específica', description:getTaskDescription })
  @ApiResponse(responsesSucces.getTaskSuccess)
  @ApiResponse(responsesError.getTaskNotFound)
  @ApiResponse(responsesError.getTaskBadRequest)
  @ApiResponse(responsesError.getTaskServerError)
  @ApiResponse(responsesError.unauthorized)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; data: Task }> {
    const task = await this.tasksService.findOne(id);
    return {
        message: 'Tarea encontrada',
        data: task,
      };
    
  }

// Endpoint para actualizar una tarea
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea', description:updateTaskDescription })
  @ApiResponse(responsesSucces.updateTaskSuccess)
  @ApiResponse(responsesError.updateTaskNotFound)
  @ApiResponse(responsesError.updateTaskBadRequest)
  @ApiResponse(responsesError.updateTaskServerError)
  @ApiResponse(responsesError.unauthorized)
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<{ message: string; data: Task }> {
    const updtaeTask = await this.tasksService.update(id, updateTaskDto);
    return {
        message: 'Tarea actualizada',
        data: updtaeTask,
      };
  }

  // Endpoint para eliminar una tarea
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea',description:deleteTaskDescription })
  @ApiResponse(responsesSucces.deleteTaskSuccess)
  @ApiResponse(responsesError.deleteTaskNotFound)
  @ApiResponse(responsesError.deleteTaskBadRequest)
  @ApiResponse(responsesError.deleteTaskServerError)
  @ApiResponse(responsesError.unauthorized)
  async remove(@Param('id',ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.tasksService.remove(id);
    return {
        message: 'Tarea eliminada',
      };
  }
 
}
