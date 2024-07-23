import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SqlGenerationService } from './sql-generation.service';
import { CreateSqlGenerationDto } from './dto/create-sql-generation.dto';
import { UpdateSqlGenerationDto } from './dto/update-sql-generation.dto';

@Controller('generate-sql')
export class SqlGenerationController {
  constructor(private readonly sqlGenerationService: SqlGenerationService) {}

  @Post()
  async create(@Body() createSqlGenerationDto: CreateSqlGenerationDto) {
    const response = await this.sqlGenerationService.create(
      createSqlGenerationDto,
    );
    return { data: response };
  }
}
