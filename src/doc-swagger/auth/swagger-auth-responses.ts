import { succesUserExample, errorResponseseExample } from './swagger-auth-examples';

export const responsesSucces = {
    loginUserSuccess: {
        status: 201,
        description: 'Usuario logueado',
        content: {
            'application/json': { example: succesUserExample.loginUser }
        },
    }
    
};

export const responsesError = {

    loginUserBadRequest: {
        status: 400,
        description: 'Datos de entrada no válidos.',
        content: {
            'application/json': { example: errorResponseseExample.badRequestLoginUser }
        },
    },

    loginUnauthorized: { 
        status: 401, 
        description: 'Sin Autorización' ,
        content: {
            'application/json': { example: errorResponseseExample.unauthorized }
        },
    },
    
};