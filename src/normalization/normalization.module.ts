import { Module } from '@nestjs/common';
import { NormalizationService } from './normalization.service';
import { NormalizationController } from './normalization.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [NormalizationController],
  providers: [NormalizationService],
})
export class NormalizationModule {}
