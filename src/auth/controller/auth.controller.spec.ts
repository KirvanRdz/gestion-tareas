// auth.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('debería retornar un token JWT si el login es exitoso', async () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = { access_token: 'fake_jwt_token' };

    jest.spyOn(authService, 'login').mockResolvedValue(token);

    const loginDto: LoginDto = { email: 'test@example.com', password: 'password' };
    const req = { user };

    const result = await authController.login(req, loginDto);
    expect(result).toEqual(token);
    expect(authService.login).toHaveBeenCalledWith(req.user);
  });
});
