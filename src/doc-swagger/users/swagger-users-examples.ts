export const succesUserExample = {
    createUser: {

        id:1,
        email: "ejemplo@dominio.com",
        password:"hashedpassword"
       
    }
};

export const errorResponseseExample = {
    badRequestCreateUser:{ 
        message: [  
                    "Debes proporcionar un email válido",
                    "El email es obligatorio",
                    "El password es obligatorio"
                ],   
        error: "Bad Request",            
        statusCode: 400 
    },
    conflictCreateUser:{ 
        message: "El email ya está en uso",
        error: "Conflict",            
        statusCode: 409 
    },

};
