import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('Pruebas de integración de autenticación y gestión de tareas', () => {
  let app: INestApplication;
  let accessToken: string;
  let idTarea: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Usa el módulo principal para cargar todos los módulos necesarios
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  // Flujo de Registro
  it('Debe registrar un usuario', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/registro')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
  });

  //  Flujo de Inicio de Sesión
  it('Debe autenticar al usuario y devolver un token JWT', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201);
      
    expect(response.body).toHaveProperty('access_token');
    accessToken = response.body.access_token; // Guarda el token para las siguientes pruebas
  });

  // Crear una Tarea
  it('Debe permitir al usuario crear una tarea', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/tareas')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ titulo: 'Nueva Tarea', descripcion: 'Descripción de la tarea', estado: 'pendiente' })
      .expect(201);
      
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.message).toBe('Tarea creada');
    expect(response.body.data.titulo).toBe('Nueva Tarea');
    expect(response.body.data.descripcion).toBe('Descripción de la tarea');
    expect(response.body.data.estado).toBe('pendiente');
    expect(response.body.data.fecha_vencimiento).toBe(null);
    idTarea=response.body.data.id; //guardar id para poder eliminar y actualizar tarea
  });

  // Obtener Lista de Tareas
  it('Debe devolver una lista de tareas', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/tareas')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    
    expect(response.body.message).toBe('Tareas encontradas');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

   // Obtener una tarea específica
   it('Debe permitir al usuario obtener una tarea especifica', async () => {
    const response = await request(app.getHttpServer())
      .get(`/api/tareas/${idTarea}`) 
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    
    expect(response.body.data.id).toBe(idTarea);
    expect(response.body.data).toHaveProperty('titulo');
    expect(response.body.data).toHaveProperty('descripcion');
    expect(response.body.data).toHaveProperty('fecha_vencimiento');
    expect(response.body.data).toHaveProperty('estado');
  });


  // Actualizar una Tarea
  it('Debe permitir al usuario actualizar una tarea', async () => {
    const response = await request(app.getHttpServer())
      .put(`/api/tareas/${idTarea}`) 
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ titulo: 'Tarea Actualizada', descripcion: 'Descripción actualizada' })
      .expect(200);
    
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.titulo).toBe('Tarea Actualizada');
    expect(response.body.data.descripcion).toBe('Descripción actualizada');
    expect(response.body.data).toHaveProperty('fecha_vencimiento');
    expect(response.body.data).toHaveProperty('estado');
  });

  // Eliminar una Tarea
  it('Debe permitir al usuario eliminar una tarea', async () => {
    const response= await request(app.getHttpServer())
      .delete(`/api/tareas/${idTarea}`) 
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.message).toBe('Tarea eliminada');
  });
});
