import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureService } from './temperature.service';

describe('TemperatureService', () => {
  let service: TemperatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemperatureService],
    }).compile();

    service = module.get<TemperatureService>(TemperatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
