import { BadRequestException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';
import { CreateNormalizationDto } from 'src/normalization/dto/create-normalization.dto';
import { CreateSqlGenerationDto } from 'src/sql-generation/dto/create-sql-generation.dto';
import { Roles } from './roles.enum';
import { DEFAULT_MODEL_GEN, DEFAULT_TEMP_GEN, SQL_GEN } from './constants';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.API_KEY });
  }

  async generateSql(
    createSqlGenerationDto: CreateSqlGenerationDto,
  ): Promise<ChatCompletion> {
    try {
      let promptGuide = `${process.env.INIT_NORM_TOKEN} ${createSqlGenerationDto.sqlLang}${process.env.MID_NORM_TOKEN} ${createSqlGenerationDto.data}`;

      const response = await this.openai.chat.completions.create({
        temperature: DEFAULT_TEMP_GEN,
        model: SQL_GEN,
        messages: [{ role: Roles.User, content: promptGuide }],
      });
      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async normalizeTables(
    createNormalizationDto: CreateNormalizationDto,
  ): Promise<ChatCompletion> {
    try {
      let promptGuide = process.env.NORM_TOKEN;
      promptGuide += createNormalizationDto.message;

      const response = await this.openai.chat.completions.create({
        temperature: DEFAULT_TEMP_GEN,
        model: DEFAULT_MODEL_GEN,
        messages: [{ role: Roles.User, content: promptGuide }],
      });
      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
