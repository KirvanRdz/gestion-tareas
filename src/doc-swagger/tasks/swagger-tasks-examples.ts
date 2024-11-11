export const succesTaskExample = {
    createTask: {

        message: 'Tarea creada',
        data: {
                id:1,
                titulo: "titulo ejemplo",
                descripcion: "descripción ejemplo",
                fecha_vencimiento: "2024-12-31",
                estado: "pendiente"
        }
    },

    getAllTask: {

        message: 'Tareas encontradas',
        data: [{
                id:1,
                titulo: "titulo ejemplo",
                descripcion: "descripción ejemplo",
                fecha_vencimiento: "2024-12-31",
                estado: "pendiente"
        }]
    },

    getTask: {

        message: 'Tarea encontrada',
        data: {
                id:1,
                titulo: "titulo ejemplo",
                descripcion: "descripción ejemplo",
                fecha_vencimiento: "2024-12-31",
                estado: "pendiente"
        }
    },

    updateTask: {

        message: 'Tarea actualizada',
        data: {
                id:1,
                titulo: "titulo ejemplo actualizado",
                descripcion: "descripción ejemplo actualizado",
                fecha_vencimiento: "2024-12-31",
                estado: "completado"
        }
    },

    deleteTask: {

        message: 'Tarea Eliminada'
        
    }
};

export const errorResponseseExample = {
    badRequestCreateTask:{ 
        message: [  
                    "El título debe ser un string",
                    "El título es obligatorio.",
                    "La fecha de vencimiento debe tener el formato YYYY-MM-DD.",
                    "Estado inválido. Debe ser pendiente, en progreso o completado.",
                    "El estado es obligatorio."
                ],   
        error: "Bad Request",            
        statusCode: 400 
    },
    badRequestGetAllTask:{ 
        message: [  
                    "Page debe ser al menos 1.",
                    "Page debe ser un número entero.",
                    "Limit debe ser al menos 1.",
                    "Limit debe ser un número entero."
                ],   
        error: "Bad Request",            
        statusCode: 400 
    },     
    badRequestGetTask:{ 
        message: "Validation failed (numeric string is expected)",
        error: "Bad Request",
        statusCode: 400
    },    
    badRequestUpdateTask:{ 
        message: "Validation failed (numeric string is expected)",
        error: "Bad Request",
        statusCode: 400
    },  
    badRequestDeleteTask:{ 
        message: "Validation failed (numeric string is expected)",
        error: "Bad Request",
        statusCode: 400
    },                      
    notFoundGetTask:{ 
        message: "Tarea con ID=1 no encontrada.",   
        error: "Not Found",            
        statusCode: 404 
    },    
   
    notFoundUpdateTask:{ 
        message: "Tarea con ID=1 no encontrada.",   
        error: "Not Found",            
        statusCode: 404 
    },
    
    notFoundDeleteTask:{ 
        message: "Tarea con ID=1 no encontrada.",   
        error: "Not Found",            
        statusCode: 404 
    }, 
    serverErrorCreateTask:{ 
        message: "Error al crear la tarea.",
        error: "Internal Server Error",            
        statusCode: 500
    },
    serverErrorGetAllTask:{ 
        message: "Error al obtener la lista de tareas." ,
        error: "Internal Server Error",            
        statusCode: 500 
    },     
    serverErrorGetTask:{ 
        message: "Error al buscar la tarea con ID ${id}.",
        error: "Internal Server Error",
        statusCode: 500
    },    
    serverErrorUpdateTask:{ 
        message: "Error al actualizar la tarea con ID ${id}.",
        error: "Internal Server Error",
        statusCode: 500
    },  
    serverErrorDeleteTask:{ 
        message: "Error al eliminar la tarea con ID ${id}.",
        error: "Internal Server Error",
        statusCode: 500
    },                    
    unauthorized: { message: 'Unauthorized', statusCode: 401 },
};
