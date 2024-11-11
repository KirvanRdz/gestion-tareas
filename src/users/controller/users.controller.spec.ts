import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { RegisterDto } from '../dto/register.dto';
import { User } from '../entities/users.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    // Creamos un mock para el servicio de usuarios con Jest, donde `create` es una función simulada
    const mockUsersService = {
      create: jest.fn(),
    };

    // Configuramos el módulo de prueba con el controlador y el servicio mockeado
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    // Obtenemos las instancias del controlador y servicio mockeado del módulo de prueba
    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('debería estar definido', () => {
    // Verificamos que el controlador se haya creado exitosamente
    expect(usersController).toBeDefined();
  });

  describe('register', () => {
    it('debería llamar a usersService.create con el email y password correctos', async () => {
      // Creamos un DTO de registro con valores de prueba
      const registerDto: RegisterDto = { email: 'test@example.com', password: '123456' };
      
      // Simulamos un retorno de `create` que cumpla con la estructura de `User`
      const result: User = { id: 1, email: registerDto.email, password: 'hashedPassword' };
      jest.spyOn(usersService, 'create').mockResolvedValue(result);

      // Llamamos al método `register` del controlador con el DTO de prueba
      const response = await usersController.register(registerDto);

      // Verificamos que el servicio se haya llamado con los parámetros correctos
      expect(usersService.create).toHaveBeenCalledWith(registerDto.email, registerDto.password);

      // Comprobamos que la respuesta del controlador sea la esperada
      expect(response).toEqual(result);
    });

    it('debería lanzar una excepción si usersService.create falla', async () => {
      const registerDto: RegisterDto = { email: 'test@example.com', password: '123456' };

      // Configuramos el mock para que `create` lance un error
      jest.spyOn(usersService, 'create').mockRejectedValue(new Error('Error al crear usuario'));

      // Verificamos que la llamada a `register` lance una excepción
      await expect(usersController.register(registerDto)).rejects.toThrow('Error al crear usuario');
    });
  });
});
