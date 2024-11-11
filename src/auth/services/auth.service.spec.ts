import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';


describe('AuthService', () => {
    let authService: AuthService;
    let jwtService: JwtService;
    let usersService: UsersService;
  
    beforeEach(async () => {
      const mockUsersService = {
        findByEmail: jest.fn(),
      };
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: UsersService,
            useValue: mockUsersService,
          },
          {
            provide: JwtService,
            useValue: {
              sign: jest.fn(() => 'mockToken'),
            },
          },
        ],
      }).compile();
  
      authService = module.get<AuthService>(AuthService);
      jwtService = module.get<JwtService>(JwtService);
      usersService = module.get<UsersService>(UsersService);
    });
  
    it('debería validar y retornar el usuario', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
  
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  
      const result = await authService.validateUser('test@example.com', 'password');
      expect(result).toEqual({
        id: user.id,
        email: user.email,
      });
      
    });
  
    it('debería retornar un token JWT cuando el usuario inicia sesión', async () => {
      const user = { id: 1, email: 'test@example.com' };
      const token = await authService.login(user);
  
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email });
      expect(token).toEqual({ access_token: 'mockToken' }); 
    });
  
    it('debería retornar null si el usuario no es encontrado', async () => {
        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      
        const result = await authService.validateUser('nonexistent@example.com', 'password');
        expect(result).toBeNull();
      });
      
  });
