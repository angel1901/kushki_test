import { Test, TestingModule } from '@nestjs/testing';
import { AnalizeService } from './analize.service';

describe('AnalizeService', () => {
  let service: AnalizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalizeService],
    }).compile();

    service = module.get<AnalizeService>(AnalizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
