
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { RegisterDto } from '../dto/register.dto';
import { responsesSucces, responsesError } from '../../doc-swagger/users/swagger-users-responses';
import { registerDescription} from '../../doc-swagger/users/swagger-users-description-registro';

@ApiTags('Usuarios')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para registrar un nuevo usuario
  @Post('registro')
  @ApiOperation({ summary: 'Crear un nuevo usuario', description:registerDescription })
  @ApiResponse(responsesSucces.createUserSuccess)
  @ApiResponse(responsesError.cretaeUserBadRequest)
  @ApiResponse(responsesError.cretaeUserConflict)
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.create(registerDto.email, registerDto.password);
  }
}
