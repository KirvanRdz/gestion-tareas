import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './services/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('debería retornar el usuario si las credenciales son válidas', async () => {
    const user = { id: 1, email: 'test@example.com' };
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);

    const result = await localStrategy.validate('test@example.com', 'password');
    expect(result).toEqual(user);
  });

  it('debería lanzar UnauthorizedException si las credenciales no son válidas', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    await expect(localStrategy.validate('test@example.com', 'wrong_password')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
