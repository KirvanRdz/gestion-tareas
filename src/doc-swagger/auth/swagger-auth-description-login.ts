export const loginDescription = `
Este endpoint permite a los usuarios autenticarse en el sistema. Para iniciar sesión, el usuario debe proporcionar su email y password.\n\n
**Nota:** Antes de utilizar este endpoint, es necesario crear un usuario mediante el endpoint de registro.\n\n
Una vez autenticado exitosamente, el endpoint devolverá un token de acceso (JWT) que deberá incluirse en las solicitudes a otros endpoints protegidos, como los endpoints para la gestión de tareas.\n\n
**Instrucciones:**\n
1. Registra un usuario (si no lo has hecho) usando el endpoint de registro.\n
2. Utiliza este endpoint de login con las credenciales registradas.\n
3. Copia el token de acceso que se recibe en la respuesta y úsalo en la cabecera de autorización (Bearer Token) para los endpoints de tareas.
`;
