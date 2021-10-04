import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureController } from './temperature.controller';

describe('TemperatureController', () => {
  let controller: TemperatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemperatureController],
    }).compile();

    controller = module.get<TemperatureController>(TemperatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
