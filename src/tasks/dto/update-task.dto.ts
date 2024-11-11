import { IsString, Matches, IsOptional, IsEnum } from 'class-validator';
import {TaskStatus} from '../enums/task-status.enum'
import { ApiProperty} from '@nestjs/swagger';
import { requestUpdateTask } from '../../doc-swagger/tasks/swagger-tasks-request'

export class UpdateTaskDto {
    @ApiProperty( requestUpdateTask.titulo)
    @IsOptional()
    @IsString({ message: 'El título debe ser un string' })
    titulo?: string;

    @ApiProperty( requestUpdateTask.descripcion)
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty( requestUpdateTask.fecha_vencimiento)
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha de vencimiento debe tener el formato YYYY-MM-DD.' })
    fecha_vencimiento?: string;

    @ApiProperty( requestUpdateTask.estado)
    @IsOptional()
    @IsEnum(TaskStatus, { message: 'Estado inválido. Debe ser pendiente, en progreso o completado.' })
    estado?: TaskStatus; // "pendiente", "en progreso", "completado"
}
