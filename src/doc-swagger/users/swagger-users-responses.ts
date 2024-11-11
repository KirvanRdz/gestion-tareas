import { succesUserExample, errorResponseseExample } from './swagger-users-examples';

export const responsesSucces = {
    createUserSuccess: {
        status: 201,
        description: 'Usuario creado',
        content: {
            'application/json': { example: succesUserExample.createUser }
        },
    }
    
};

export const responsesError = {

    cretaeUserBadRequest: {
        status: 400,
        description: 'Datos de entrada no válidos.',
        content: {
            'application/json': { example: errorResponseseExample.badRequestCreateUser }
        },
    },
    cretaeUserConflict: {
        status: 409,
        description: 'El email ya está en uso',
        content: {
            'application/json': { example: errorResponseseExample.conflictCreateUser }
        },
    },
    
};