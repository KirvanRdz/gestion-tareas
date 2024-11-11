import {TaskStatus} from '../../tasks/enums/task-status.enum'

export const requestCreateTask = {
    titulo: {
        description: 'Título de la tarea',
        example: 'titulo ejemplo',
      },
    descripcion: {
        description: 'Descripción opcional de la tarea',
        example: 'descripción ejemplo',
        required: false,
      },
    fecha_vencimiento: {
        description: 'Fecha de vencimiento de la tarea (formato YYYY-MM-DD)',
        example: '2024-12-31',
        required: false,
      },
    estado: {
        description: 'Estado de la tarea',
        example: TaskStatus.PENDING,
        enum: TaskStatus // Utiliza los valores del enum
      }
    
};

export const requestUpdateTask = {
    titulo: {
        description: 'Título de la tarea',
        example: 'titulo ejemplo actualizado',
        required: false
      },
    descripcion: {
        description: 'Descripción de la tarea',
        example: 'descripción ejemplo actualizado',
        required: false,
      },
    fecha_vencimiento: {
        description: 'Fecha de vencimiento de la tarea (formato YYYY-MM-DD)',
        example: '2024-12-31',
        required: false,
      },
    estado: {
        description: 'Estado de la tarea',
        example: TaskStatus.COMPLETED,
        enum: TaskStatus, // Utiliza los valores del enum
        required: false,
      }
    
};