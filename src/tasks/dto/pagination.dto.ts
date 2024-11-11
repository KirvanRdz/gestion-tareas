import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class PaginationDto {
  @ApiProperty({
    description: 'Número de página',
    example: 1,
    required: false,
    default:1
  })
  @Type(() => Number) // Convierte el valor a número
  @IsOptional()
  @IsInt({ message: 'Page debe ser un número entero.' })
  @Min(1, { message: 'Page debe ser al menos 1.' })
  page: number;

  @ApiProperty({
    description: 'Cantidad de resultados por página',
    example: 10,
    required: false,
    default:10
  })
  @Type(() => Number) // Convierte el valor a número
  @IsOptional()
  @IsInt({ message: 'Limit debe ser un número entero.' })
  @Min(1, { message: 'Limit debe ser al menos 1.' })
  limit: number;
}
