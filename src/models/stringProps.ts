import { ApiProperty } from '@nestjs/swagger';

export class StringProps {
  @ApiProperty({
    example: 'Esto es un ejemplo en español',
    description: 'Source string on some language',
  })
  source: string;
  @ApiProperty({
    example: 11,
    description: 'The number of counters on the string',
  })
  counters: number;
  @ApiProperty({
    example: 29,
    description: 'The lenght of the string / total number of characters',
  })
  length: number;
}
