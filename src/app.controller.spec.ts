import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SourceError } from './models/sourceErrors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dictionary = require('./models/configs/dictionary.config.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const whitelist = require('./models/configs/whitelist.json');

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appController.addDictionary(dictionary);
    appController.addWhitelist(whitelist);
  });

  describe('root', () => {
    it('should return 200 and correct example value"', () => {
      expect(
        appController.getStringCounters(
          'El 37% de los humanos esta bancarizado',
        ),
      ).toStrictEqual({
        source: 'El 37% de los humanos esta bancarizado',
        counters: 16,
        length: 38,
      });
    });
    it.todo('should return 400 with Invalid Character message');
  });
});
