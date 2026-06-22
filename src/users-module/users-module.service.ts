import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { CreateUsersModuleDto } from './dto/create-users-module.dto';
import { UpdateUsersModuleDto } from './dto/update-users-module.dto';

@Injectable()
export class UsersModuleService {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  async create(createUsersModuleDto: CreateUsersModuleDto) {
    const { firstname, lastname } = createUsersModuleDto;
    let guest = await this.guestsRepository.findOne({
      where: { firstname, lastname },
    });

    if (guest) {
      Object.assign(guest, createUsersModuleDto);
      guest.confirmed_at = new Date();
      return await this.guestsRepository.save(guest);
    } else {
      guest = this.guestsRepository.create({
        ...createUsersModuleDto,
        confirmed_at: new Date(),
      });
      return await this.guestsRepository.save(guest);
    }
  }

  async findAll() {
    return await this.guestsRepository.find();
  }

  async findOne(id: number) {
    return await this.guestsRepository.findOneBy({ id });
  }

  async update(id: number, updateUsersModuleDto: UpdateUsersModuleDto) {
    const guest = await this.guestsRepository.findOneBy({ id });
    if (!guest) return null;
    Object.assign(guest, updateUsersModuleDto);
    if (updateUsersModuleDto.confirmed_presence !== undefined) {
      guest.confirmed_at = new Date();
    }
    return await this.guestsRepository.save(guest);
  }

  async remove(id: number) {
    const guest = await this.guestsRepository.findOneBy({ id });
    if (!guest) return null;
    return await this.guestsRepository.remove(guest);
  }
}

