import { Test, TestingModule } from '@nestjs/testing';
import { SchemaParserService } from './schema-parser.service';

describe('SchemaParserService', () => {
  let service: SchemaParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchemaParserService],
    }).compile();

    service = module.get<SchemaParserService>(SchemaParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
