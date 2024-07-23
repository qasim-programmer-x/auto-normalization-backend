import { Injectable } from '@nestjs/common';

@Injectable()
export class SchemaParserService {
  parseSchema(schema: any) {
    const entities = {};
    for (const [entityName, entityData] of Object.entries(schema)) {
      entities[entityName] = {
        columns: (entityData as any).columns,
        primaryKey: (entityData as any).primary_key,
        foreignKeys: (entityData as any).foreign_keys || {},
      };
    }
    return entities;
  }
}
