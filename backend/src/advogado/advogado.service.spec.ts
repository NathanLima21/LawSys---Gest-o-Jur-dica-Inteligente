import { Test, TestingModule } from '@nestjs/testing';
import { AdvogadoService } from './advogado.service';

describe('AdvogadoService', () => {
  let service: AdvogadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvogadoService],
    }).compile();

    service = module.get<AdvogadoService>(AdvogadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
