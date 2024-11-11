import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';
import { requestCreateUser } from '../../doc-swagger/users/swagger-users-request'

export class LoginDto {
  @ApiProperty( requestCreateUser.email)
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Debes proporcionar un email válido' })
  email: string;

  @ApiProperty( requestCreateUser.password)
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;
}
