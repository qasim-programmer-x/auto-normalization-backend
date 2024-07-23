import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSqlGenerationDto } from './dto/create-sql-generation.dto';
import { UpdateSqlGenerationDto } from './dto/update-sql-generation.dto';
import { OpenAiService } from 'src/openai/openai.service';
import { ChatCompletion } from 'openai/resources';

@Injectable()
export class SqlGenerationService {
  constructor(private readonly openaiService: OpenAiService) {}
  async create(
    createSqlGenerationDto: CreateSqlGenerationDto,
  ): Promise<ChatCompletion> {
    try {
      const response = this.openaiService.generateSql(createSqlGenerationDto);
      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
