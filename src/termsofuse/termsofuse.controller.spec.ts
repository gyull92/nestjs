import { Test, TestingModule } from '@nestjs/testing';
import { TermsofuseController } from './termsofuse.controller';

describe('TermsofuseController', () => {
  let controller: TermsofuseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermsofuseController],
    }).compile();

    controller = module.get<TermsofuseController>(TermsofuseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
