export const succesUserExample = {
    loginUser: {

        access_token: "token de acceso"
       
    }
};

export const errorResponseseExample = {
    badRequestLoginUser:{ 
        message: [  
                    "Debes proporcionar un email válido",
                    "El email es obligatorio",
                    "El password es obligatorio"
                ],   
        error: "Bad Request",            
        statusCode: 400 
    },
    unauthorized: { 
        message: 'Credenciales incorrectas', 
        error: "Unauthorized",
        statusCode: 401 
    },

};
