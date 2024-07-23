import { Test, TestingModule } from '@nestjs/testing';
import { SqlGenerationController } from './sql-generation.controller';
import { SqlGenerationService } from './sql-generation.service';

describe('SqlGenerationController', () => {
  let controller: SqlGenerationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqlGenerationController],
      providers: [SqlGenerationService],
    }).compile();

    controller = module.get<SqlGenerationController>(SqlGenerationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
