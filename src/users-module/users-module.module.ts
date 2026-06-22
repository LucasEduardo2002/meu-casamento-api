import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModuleService } from './users-module.service';
import { UsersModuleController } from './users-module.controller';
import { Guest} from './entities/guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  controllers: [UsersModuleController],
  providers: [UsersModuleService],
})
export class UsersModuleModule {}
