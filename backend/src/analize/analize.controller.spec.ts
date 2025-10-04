import { Test, TestingModule } from '@nestjs/testing';
import { AnalizeController } from './analize.controller';

describe('AnalizeController', () => {
  let controller: AnalizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalizeController],
    }).compile();

    controller = module.get<AnalizeController>(AnalizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
