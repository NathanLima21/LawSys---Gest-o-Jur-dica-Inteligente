import { Test, TestingModule } from '@nestjs/testing';
import { AdvogadoController } from './advogado.controller';
import { AdvogadoService } from './advogado.service';

describe('AdvogadoController', () => {
  let controller: AdvogadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvogadoController],
      providers: [AdvogadoService],
    }).compile();

    controller = module.get<AdvogadoController>(AdvogadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
