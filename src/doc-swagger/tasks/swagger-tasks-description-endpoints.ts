export const createTaskDescription = `
Este endpoint permite a los usuarios crear una nueva tarea en el sistema. Para ello, deben estar autenticados y proporcionar la información necesaria sobre la tarea, como título, descripción, fecha de vencimiento y estado.\n
**Nota:** Se requiere autenticación. Asegúrate de incluir el token de acceso (JWT) en la cabecera de autorización (Bearer Token) antes de hacer la solicitud.\n

**Instrucciones:**\n
1. Autentícate mediante el endpoint de login y obtén un token de acceso.\n
2. Usa el token de acceso en la cabecera de autorización para este endpoint.\n
3. Envía una solicitud con los datos necesarios para crear la tarea, incluyendo:\n
   - **titulo**: Título de la tarea (obligatorio)\n
   - **descripcion**: Descripción de la tarea (opcional)\n
   - **fecha_vencimiento**: Fecha de vencimiento en formato YYYY-MM-DD (opcional)\n
   - **estado**: Estado de la tarea 'pendiente','en progreso' ó 'completado' (obligatorio)`;

export const getTasksDescription = `
Este endpoint permite obtener una lista paginada de tareas. Los usuarios pueden especificar el número de página y el límite de tareas por página.\n
**Nota:** Se requiere autenticación. Asegúrate de incluir el token de acceso (JWT) en la cabecera de autorización (Bearer Token) antes de hacer la solicitud.\n
**Instrucciones:**\n
1. Autentícate mediante el endpoint de login y obtén un token de acceso.\n
2. Usa el token de acceso en la cabecera de autorización para este endpoint.\n
3. Opcionalmente, proporciona los parámetros \`page\` y \`limit\` para controlar la paginación.\n
   - **page**: Número de la página que deseas ver (por defecto es 1 si no se especifica)\n
   - **limit**: Número de tareas por página (por defecto es 10 si no se especifica)\n`;

export const getTaskDescription = `
Este endpoint permite obtener una tarea específica mediante su ID.\n
**Nota:** Se requiere autenticación. Asegúrate de incluir el token de acceso (JWT) en la cabecera de autorización (Bearer Token) antes de hacer la solicitud.\n
**Instrucciones:**\n
1. Autentícate mediante el endpoint de login y obtén un token de acceso.\n
2. Usa el token de acceso en la cabecera de autorización para este endpoint.\n
3. Proporciona el ID de la tarea que deseas obtener en la URL.
`;

export const updateTaskDescription = `
Este endpoint permite actualizar los detalles de una tarea específica mediante su ID.\n
**Nota:** Se requiere autenticación. Asegúrate de incluir el token de acceso (JWT) en la cabecera de autorización (Bearer Token) antes de hacer la solicitud.\n
**Instrucciones:**\n
1. Autentícate mediante el endpoint de login y obtén un token de acceso.\n
2. Usa el token de acceso en la cabecera de autorización para este endpoint.\n
3. Proporciona el ID de la tarea que deseas actualizar en la URL y envía los campos que quieres modificar en el cuerpo de la solicitud (por ejemplo: título, descripción, estado, o fecha de vencimiento).
`;

export const deleteTaskDescription = `
Este endpoint permite eliminar una tarea específica mediante su ID.\n
**Nota:** Se requiere autenticación. Asegúrate de incluir el token de acceso (JWT) en la cabecera de autorización (Bearer Token) antes de hacer la solicitud.\n
**Instrucciones:**\n
1. Autentícate mediante el endpoint de login y obtén un token de acceso.\n
2. Usa el token de acceso en la cabecera de autorización para este endpoint.\n
3. Proporciona el ID de la tarea que deseas eliminar en la URL.\n
`;
