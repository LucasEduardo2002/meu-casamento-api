import { Test, TestingModule } from '@nestjs/testing';
import { UsersModuleController } from './users-module.controller';
import { UsersModuleService } from './users-module.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';

describe('UsersModuleController', () => {
  let controller: UsersModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersModuleController],
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

    controller = module.get<UsersModuleController>(UsersModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

