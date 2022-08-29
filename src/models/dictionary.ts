import { ApiProperty } from '@nestjs/swagger';

export class Dictionary {
  @ApiProperty({
    example: '{"char": "a", "counters": 1}',
    description: 'Source string on some language',
  })
  dictionary: Array<DictionaryEntry>;
}

export class DictionaryEntry {
  @ApiProperty({
    example: 'a',
    description: 'character on some language',
  })
  char: string;
  @ApiProperty({
    example: 1,
    description: 'the number of closed-strokes or counters',
  })
  counters: number;
}
