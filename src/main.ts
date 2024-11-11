import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Activa el ValidationPipe globalmente
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades adicionales no definidas en el DTO
      forbidNonWhitelisted: true, // Genera un error si hay propiedades extra
      transform: true, // Transforma automáticamente los tipos
      errorHttpStatusCode: 400, // Establece el código de error a 400 para errores de validación
    }),
  );
  

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Autenticación de Usuarios y Gestión Tareas')
    .setDescription('API de Gestión de Tareas que permite a los usuarios crear, actualizar, eliminar y ver sus tareas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
