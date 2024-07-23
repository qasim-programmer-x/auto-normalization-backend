import { Test, TestingModule } from '@nestjs/testing';
import { SqlGenerationService } from './sql-generation.service';

describe('SqlGenerationService', () => {
  let service: SqlGenerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlGenerationService],
    }).compile();

    service = module.get<SqlGenerationService>(SqlGenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
