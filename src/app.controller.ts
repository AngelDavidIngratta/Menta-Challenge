import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SourceError } from './models/sourceErrors';
import { StringProps } from './models/stringProps';
import { Dictionary } from './models/dictionary';

@ApiTags('closed-strokes')
@Controller('closed-strokes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':source')
  @ApiResponse({
    status: 200,
    description: 'The calculated result',
    type: StringProps,
  })
  @ApiResponse({
    status: 400,
    description: 'The source contains a forbidden character.',
  })
  getStringCounters(@Param('source') source: string): StringProps {
    try {
      return this.appService.getStringCounters(source);
    } catch (error) {
      if (error.message === SourceError.INVALID_CHARACTER) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error:
              'The source contains a forbidden character or one of the characters is not in the dictionary.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Post('whitelist')
  @ApiResponse({
    status: 201,
    description: 'whitelist loaded!',
  })
  addWhitelist(@Body() loadWhitelist: Array<string>): void {
    this.appService.addWhitelist(loadWhitelist);
  }

  @Post('dictionary')
  @ApiResponse({
    status: 201,
    description: 'dictionary loaded!',
  })
  addDictionary(@Body() loadDictionary: Dictionary): void {
    this.appService.addDictionary(loadDictionary);
  }
}
