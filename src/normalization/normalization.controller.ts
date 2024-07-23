import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NormalizationService } from './normalization.service';
import { CreateNormalizationDto } from './dto/create-normalization.dto';
import { TableDto } from './dto/table.dto';

@Controller('normalize')
export class NormalizationController {
  constructor(private readonly normalizationService: NormalizationService) {}

  @Post()
  async create(@Body() createNormalizationDto: CreateNormalizationDto) {
    const response = await this.normalizationService.create(
      createNormalizationDto,
    );
    return { data: response };
  }
  @Post('analyses')
  async normalize(@Body() tableDto: TableDto) {
    if (!Array.isArray(tableDto.rows) || !Array.isArray(tableDto.rows[0])) {
      return {
        error: 'Invalid data format. Rows should be an array of arrays.',
      };
    }

    return this.normalizationService.normalizeTable(tableDto);
  }
}
