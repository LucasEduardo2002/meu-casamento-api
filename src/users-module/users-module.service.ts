import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from './entities/guest.entity';
import { CreateUsersModuleDto } from './dto/create-users-module.dto';
import { UpdateUsersModuleDto } from './dto/update-users-module.dto';
import { ConfirmRsvpDto } from './dto/confirm-rsvp.dto';

export const DEFAULT_GUESTS = [
  'João e Cláudia',
  'Carol e Jefferson',
  'Tia Cássia e família',
  'Tia Kely',
  'Tia Claudiane',
  'Tetinha e Diá',
  'Simony e Sanderilson',
  'Nilda e Josielton',
  'Glória e João',
  'Kennedy',
  'Eduarda e Djair',
  'Franciely e Judson',
  'Matheus Felinto',
  'Layana e Fabiano',
  'Diolange Maria e Wanderley',
  'Maria Beatriz',
  'Jéssica e Fabrício',
  'Tio Augusto e família',
  'Tio Antônio e Rosa',
  'Tio Zeza e Tia Anita',
  'Júlio e Meiry Laine',
  'Tia Fátima',
  'Déborah e família',
  'Tia Nadja e família',
  'Sidney e Adalgiza',
  'Bruna e família',
  'Cota e Esposo',
  'Tia Francisquinha e Tio Abraão',
  'Surama e Evânio',
  'Anna Júlia e Eliabe',
  'Anny e Cláudio',
  'Juciene',
  'Gisele e Renan',
  'Eduarda e Jadyel',
  'Do Carmo e Geraldo',
  'Margarida Brilhante',
  'Catarina',
  'Manoel e Iraci',
  'Ceíres e Venâncio',
  'Ubaldo e família',
  'Luizinha e família',
  'Vovó Nazaré e família',
  'Cacildo e família',
  'Leonardo e família',
  'Madrinha Iaponira',
  'Vitória, Eloyse e Emily',
  'Marcosuel e família',
  'Leonardo e Lorena',
  'André e Larissa',
  'Gustavo e Letícia',
  'Ícaro e Júlia',
  'João Emanuel',
  'Carlos e Yasmin',
  'Ryckelmy e família',
  'Guilherme e Fabiana',
  'Luan e Camila',
  'Moisés',
  'Pedro e Gabriela',
  'Bruno e Sheila',
  'Irene Macedo',
  'Antônio Girorme',
  'Jaiane e José Carlos',
  'Tia Luciana',
  'Tia Graça',
  'Tio Valderi e Lourdes',
];

@Injectable()
export class UsersModuleService implements OnModuleInit {
  constructor(
    @InjectRepository(Guest)
    private guestsRepository: Repository<Guest>,
  ) {}

  async onModuleInit() {
    try {
      for (const guestName of DEFAULT_GUESTS) {
        let guest = await this.guestsRepository.findOne({
          where: [{ name: guestName }, { firstname: guestName }],
        });

        if (!guest) {
          guest = this.guestsRepository.create({
            name: guestName,
            firstname: guestName,
            lastname: '',
            confirmed_presence: false,
            has_absentees: false,
            guest_count: 1,
          });
          await this.guestsRepository.save(guest);
        } else if (!guest.name) {
          guest.name = guestName;
          await this.guestsRepository.save(guest);
        }
      }
      console.log('Lista de convidados padrão sincronizada com sucesso!');
    } catch (e) {
      console.warn('Erro ao sincronizar lista padrão de convidados:', e.message);
    }
  }

  async create(createUsersModuleDto: CreateUsersModuleDto) {
    const name = createUsersModuleDto.name || `${createUsersModuleDto.firstname || ''} ${createUsersModuleDto.lastname || ''}`.trim();
    let guest = await this.guestsRepository.findOne({
      where: [{ name }, { firstname: createUsersModuleDto.firstname, lastname: createUsersModuleDto.lastname }],
    });

    if (guest) {
      Object.assign(guest, createUsersModuleDto);
      guest.name = name;
      guest.confirmed_at = new Date();
      return await this.guestsRepository.save(guest);
    } else {
      guest = this.guestsRepository.create({
        ...createUsersModuleDto,
        name,
        confirmed_at: new Date(),
      });
      return await this.guestsRepository.save(guest);
    }
  }

  async findAll() {
    return await this.guestsRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const guest = await this.guestsRepository.findOneBy({ id });
    if (!guest) {
      throw new NotFoundException(`Convidado com ID ${id} não encontrado`);
    }
    return guest;
  }

  async confirm(id: number, confirmRsvpDto: ConfirmRsvpDto) {
    const guest = await this.findOne(id);
    guest.confirmed_presence = true;
    guest.has_absentees = !!confirmRsvpDto.has_absentees;
    guest.absent_names = confirmRsvpDto.absent_names || null;
    if (confirmRsvpDto.phone !== undefined) {
      guest.phone = confirmRsvpDto.phone;
    }
    if (confirmRsvpDto.message !== undefined) {
      guest.message = confirmRsvpDto.message;
    }
    guest.confirmed_at = new Date();
    return await this.guestsRepository.save(guest);
  }

  async reset(id: number) {
    const guest = await this.findOne(id);
    guest.confirmed_presence = false;
    guest.has_absentees = false;
    guest.absent_names = null;
    guest.confirmed_at = null;
    return await this.guestsRepository.save(guest);
  }

  async update(id: number, updateUsersModuleDto: UpdateUsersModuleDto) {
    const guest = await this.findOne(id);
    Object.assign(guest, updateUsersModuleDto);
    if (updateUsersModuleDto.confirmed_presence !== undefined) {
      guest.confirmed_at = new Date();
    }
    return await this.guestsRepository.save(guest);
  }

  async remove(id: number) {
    const guest = await this.findOne(id);
    return await this.guestsRepository.remove(guest);
  }
}
