import { PartialType } from '@nestjs/mapped-types';
import { CreateSqlGenerationDto } from './create-sql-generation.dto';

export class UpdateSqlGenerationDto extends PartialType(CreateSqlGenerationDto) {}
