import { succesTaskExample, errorResponseseExample } from './swagger-tasks-examples';

export const responsesSucces = {
    createTaskSuccess: {
        status: 201,
        description: 'Tarea creada.',
        content: {
            'application/json': { example: succesTaskExample.createTask }
        },
    },
    getAllTaskSuccess: {
        status: 200,
        description: 'Tareas encontradas.',
        content: {
            'application/json': { example: succesTaskExample.getAllTask }
        },
    },
    getTaskSuccess: {
        status: 200,
        description: 'Tarea encontrada.',
        content: {
            'application/json': { example: succesTaskExample.getTask }
        },
    },
    updateTaskSuccess: {
        status: 200,
        description: 'Tarea actualizada.',
        content: {
            'application/json': { example: succesTaskExample.updateTask }
        },
    },
    deleteTaskSuccess: {
        status: 200,
        description: 'Tarea eliminada.',
        content: {
            'application/json': { example: succesTaskExample.deleteTask }
        },
    },
};

export const responsesError = {

    cretaeTaskBadRequest: {
        status: 400,
        description: 'Datos de entrada no válidos.',
        content: {
            'application/json': { example: errorResponseseExample.badRequestCreateTask }
        },
    },
    getAllTaskBadRequest: {
        status: 400,
        description: 'Parametros de entrada no válidos.',
        content: {
            'application/json': { example: errorResponseseExample.badRequestGetAllTask }
        },
    },
    getTaskBadRequest: {
        status: 400,
        description: 'Parametros de entrada no válidos.',
        content: {
            'application/json': { example: errorResponseseExample.badRequestGetTask }
        },
    },
    updateTaskBadRequest: {
        status: 400,
        description: 'Parametros de entrada no válidos.',
        content: {
            'application/json': { example: errorResponseseExample.badRequestUpdateTask }
        },
    },
    deleteTaskBadRequest: {
        status: 400,
        description: 'Parametros de entrada no válidos.',
        content: {
            'application/json': { example: errorResponseseExample.badRequestDeleteTask }
        },
    },
    getTaskNotFound: {
        status: 404,
        description: 'Tarea no encontrada.',
        content: {
            'application/json': { example: errorResponseseExample.notFoundGetTask }
        },
    },
    
    updateTaskNotFound: {
        status: 404,
        description: 'Tarea no encontrada.',
        content: {
            'application/json': { example: errorResponseseExample.notFoundUpdateTask }
        },
    },
   
    deleteTaskNotFound: {
        status: 404,
        description: 'Tarea no encontrada.',
        content: {
            'application/json': { example: errorResponseseExample.notFoundUpdateTask }
        },
    },
    cretaeTaskServerError: {
        status: 500,
        description: 'Error al crear tarea.',
        content: {
            'application/json': { example: errorResponseseExample.serverErrorCreateTask }
        },
    },
    getAllTaskServerError: {
        status: 500,
        description: 'Error al obtener lista de tareas.',
        content: {
            'application/json': { example: errorResponseseExample.serverErrorGetAllTask }
        },
    },
    getTaskServerError: {
        status: 500,
        description: 'Error al obtener tarea.',
        content: {
            'application/json': { example: errorResponseseExample.serverErrorGetTask }
        },
    },
    updateTaskServerError: {
        status: 500,
        description: 'Error al actualizar tarea.',
        content: {
            'application/json': { example: errorResponseseExample.serverErrorUpdateTask }
        },
    },
    deleteTaskServerError: {
        status: 500,
        description: 'Error al eliminar tarea.',
        content: {
            'application/json': { example: errorResponseseExample.serverErrorDeleteTask }
        },
    },
    unauthorized: { 
        status: 401, 
        description: 'Sin Autorización.' ,
        content: {
            'application/json': { example: errorResponseseExample.unauthorized }
        },
    },
};