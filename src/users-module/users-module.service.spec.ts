import { Test, TestingModule } from '@nestjs/testing';
import { UsersModuleService } from './users-module.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';

describe('UsersModuleService', () => {
  let service: UsersModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersModuleService,
        {
          provide: getRepositoryToken(Guest),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersModuleService>(UsersModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
