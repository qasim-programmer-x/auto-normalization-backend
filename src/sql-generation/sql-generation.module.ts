import { Module } from '@nestjs/common';
import { SqlGenerationService } from './sql-generation.service';
import { SqlGenerationController } from './sql-generation.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [SqlGenerationController],
  providers: [SqlGenerationService],
})
export class SqlGenerationModule {}
