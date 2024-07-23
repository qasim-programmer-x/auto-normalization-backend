import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNormalizationDto } from './dto/create-normalization.dto';
import * as openai from 'openai';
import { OpenAiService } from 'src/openai/openai.service';
import { ChatCompletion } from 'openai/resources';
import { TableDto } from './dto/table.dto';

@Injectable()
export class NormalizationService {
  constructor(private readonly openaiService: OpenAiService) {}
  normalizeTable(tableDto) {
    const { headers, rows } = tableDto;

    const uniqueCols = [];
    const nonUniqueCols = [];
    for (let header of headers) {
      if (this.isUnique(header, rows, headers)) {
        uniqueCols.push(header);
      } else {
        nonUniqueCols.push(header);
      }
    }

    const primeAttributes = uniqueCols;
    const nonPrimeAttributes = nonUniqueCols;

    const dependencies = [];
    for (let prime of primeAttributes) {
      for (let nonPrime of nonPrimeAttributes) {
        dependencies.push({ determinant: prime, dependent: nonPrime });
      }
    }

    for (let i = 0; i < nonPrimeAttributes.length; i++) {
      for (let j = 0; j < nonPrimeAttributes.length; j++) {
        if (i !== j) {
          if (
            this.isFunctionallyDependent(
              nonPrimeAttributes[i],
              nonPrimeAttributes[j],
              rows,
              headers,
            )
          ) {
            dependencies.push({
              determinant: nonPrimeAttributes[i],
              dependent: nonPrimeAttributes[j],
            });
          }
        }
      }
    }

    return {
      'Prime Attributes': primeAttributes,
      'Non-Prime Attributes': nonPrimeAttributes,
      'Functional Dependencies': dependencies,
    };
  }

  isUnique(column, rows, headers) {
    const colIndex = headers.indexOf(column);
    const values = new Set();
    for (let row of rows) {
      if (values.has(row[colIndex])) {
        return false;
      }
      values.add(row[colIndex]);
    }
    return true;
  }

  isFunctionallyDependent(determinant, dependent, rows, headers) {
    const detIndex = headers.indexOf(determinant);
    const depIndex = headers.indexOf(dependent);
    const valueMap = new Map();

    for (let row of rows) {
      const detValue = row[detIndex];
      const depValue = row[depIndex];
      if (valueMap.has(detValue)) {
        if (valueMap.get(detValue) !== depValue) {
          return false;
        }
      } else {
        valueMap.set(detValue, depValue);
      }
    }
    return true;
  }
  async create(
    createNormalizationDto: CreateNormalizationDto,
  ): Promise<ChatCompletion> {
    try {
      const response = this.openaiService.normalizeTables(
        createNormalizationDto,
      );
      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
