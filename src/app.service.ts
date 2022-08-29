import { Injectable } from '@nestjs/common';
import { SourceError } from './models/sourceErrors';
import { StringProps } from './models/stringProps';
import { Dictionary } from './models/dictionary';

@Injectable()
export class AppService {
  private dictionary: Map<string, number> = new Map();
  private whitelist: Array<string> = [];

  getCharCounter(character: string): number {
    if (this.isInWhitelist(character)) {
      if (this.dictionary.has(character)) {
        return this.dictionary.get(character);
      }
    } else {
      return -1;
    }
  }

  getStringCounters(source: string): StringProps {
    let result = 0;
    for (const char of source.replace(/\s/g, '')) {
      const charCounters = this.getCharCounter(char);
      if (charCounters !== -1) {
        result += charCounters;
      } else {
        throw new Error(SourceError.INVALID_CHARACTER);
      }
    }
    const props: StringProps = {
      source,
      counters: result,
      length: source.length,
    };
    return props;
  }

  addCharCounter(character: string, counter: number): void {
    if (!this.dictionary.has(character)) {
      this.dictionary.set(character, counter);
    }
  }

  addDictionary(dictionary: Dictionary) {
    dictionary.dictionary.forEach((value) => {
      this.dictionary.set(value.char, value.counters);
    });
  }

  isInWhitelist(character: string): boolean {
    return this.whitelist.some((value: string) => {
      return value === character;
    });
  }

  addCharacterIntoWhitelist(character: string) {
    this.whitelist.push(character);
  }

  addWhitelist(characters: string[]) {
    this.whitelist = characters;
  }
}
