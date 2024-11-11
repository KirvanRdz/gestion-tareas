
import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('debería validar el token JWT y retornar los datos del usuario', async () => {
    const payload = { sub: 1, email: 'test@example.com' };

    const result = await jwtStrategy.validate(payload);
    expect(result).toEqual({ userId: payload.sub, email: payload.email });
  });
});
