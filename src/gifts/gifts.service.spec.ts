import { Test, TestingModule } from '@nestjs/testing';
import { GiftsService } from './gifts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gift } from './entities/gift.entity';

describe('GiftsService', () => {
  let service: GiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiftsService,
        {
          provide: getRepositoryToken(Gift),
          useValue: {
            count: jest.fn().mockResolvedValue(0),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GiftsService>(GiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
