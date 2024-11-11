export const registerDescription = `
Este endpoint permite a los nuevos usuarios registrarse en el sistema. Al registrarse, el usuario deberá proporcionar la información requerida, como el email y password.\n
**Nota:** Este es un paso obligatorio antes de iniciar sesión en el sistema. Una vez registrado, el usuario podrá autenticarse mediante el endpoint de login para obtener un token de acceso.\n
**Instrucciones:**\n
1. Envía una solicitud a este endpoint con la información requerida del usuario (email y password).\n
2. Asegúrate de que los datos cumplan con los requisitos de validación (por ejemplo, un email válido.).\n
3. Una vez registrado exitosamente, procede al endpoint de login para autenticarte.\n
4. Usa el token de acceso obtenido tras el login para acceder los endpoints de tareas.`;

