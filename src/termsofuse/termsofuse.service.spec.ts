import { Test, TestingModule } from '@nestjs/testing';
import { TermsofuseService } from './termsofuse.service';

describe('TermsofuseService', () => {
  let service: TermsofuseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermsofuseService],
    }).compile();

    service = module.get<TermsofuseService>(TermsofuseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
