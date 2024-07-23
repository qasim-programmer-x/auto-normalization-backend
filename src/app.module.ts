import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NormalizationModule } from './normalization/normalization.module';
import { SqlGenerationModule } from './sql-generation/sql-generation.module';
import { OpenAiService } from './openai/openai.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { SchemaParserService } from './schema-parser/schema-parser.service';

import { SchemaParserModule } from './schema-parser/schema-parser.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '3205',
      database: 'qasim',
      autoLoadModels: true,
    }),
    NormalizationModule,
    SqlGenerationModule,
    OpenaiModule,
    SchemaParserModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenAiService, SchemaParserService],
})
export class AppModule {}
