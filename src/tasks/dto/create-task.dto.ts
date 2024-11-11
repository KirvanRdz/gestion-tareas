import { IsNotEmpty, IsString, IsOptional, Matches, IsEnum } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';
import { requestCreateTask } from '../../doc-swagger/tasks/swagger-tasks-request';
import {TaskStatus} from '../enums/task-status.enum'

export class CreateTaskDto {
  @ApiProperty( requestCreateTask.titulo)
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @IsString({ message: 'El título debe ser un string' })
  titulo: string;

  @ApiProperty( requestCreateTask.descripcion)
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty( requestCreateTask.fecha_vencimiento)
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha de vencimiento debe tener el formato YYYY-MM-DD.' })
  fecha_vencimiento?: string;

  @ApiProperty( requestCreateTask.estado)
  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  @IsEnum(TaskStatus, { message: 'Estado inválido. Debe ser pendiente, en progreso o completado.' })
  estado: TaskStatus;
}
