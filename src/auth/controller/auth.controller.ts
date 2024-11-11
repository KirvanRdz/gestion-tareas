
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { LocalAuthGuard } from '../local-auth.guard';
import { responsesSucces, responsesError } from '../../doc-swagger/auth/swagger-auth-responses';
import { loginDescription } from '../../doc-swagger/auth/swagger-auth-description-login';

@ApiTags('Autenticación')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión', description:loginDescription })
  @ApiResponse(responsesSucces.loginUserSuccess)
  @ApiResponse(responsesError.loginUnauthorized)
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
