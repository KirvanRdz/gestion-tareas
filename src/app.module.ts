import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { Task } from './tasks/entities/task.entity';
import { User } from './users/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo de configuración esté disponible globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTestEnv = process.env.NODE_ENV === 'test';

        return {
          type: isTestEnv ? 'sqlite' : 'postgres',
          host: isTestEnv ? undefined : configService.get<string>('DB_HOST'),
          port: isTestEnv ? undefined : configService.get<number>('DB_PORT') || 5432,
          username: isTestEnv ? undefined : configService.get<string>('DB_USER'),
          password: isTestEnv ? undefined : configService.get<string>('DB_PASSWORD'),
          database: isTestEnv ? ':memory:' : configService.get<string>('DB_NAME'),
          entities: [User, Task],
          synchronize: true, // Usar synchronize solo para desarrollo y pruebas
          dropSchema: isTestEnv, // Eliminar esquema en cada ejecución de prueba
        };
      },
    }),
    AuthModule,
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
