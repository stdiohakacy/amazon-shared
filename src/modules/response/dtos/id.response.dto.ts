import { ApiProperty } from '@nestjs/swagger';

export class IdResponseDto {
  @ApiProperty({
    name: 'id',
    type: 'string',
    required: true,
    description: 'return id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  string: string;
}
