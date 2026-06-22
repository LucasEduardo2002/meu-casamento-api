import { Injectable, NotFoundException, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from './entities/gift.entity';
import { CreateGiftDto } from './dto/create-gift.dto';
import { ClaimGiftDto } from './dto/claim-gift.dto';

@Injectable()
export class GiftsService implements OnModuleInit {
  constructor(
    @InjectRepository(Gift)
    private giftsRepository: Repository<Gift>,
  ) {}

  async onModuleInit() {
    const count = await this.giftsRepository.count();
    if (count === 0) {
      const defaultGifts: CreateGiftDto[] = [
        {
          name: 'Jogo de Panelas Cerâmica',
          description: 'Panelas antiaderentes elegantes para nos ajudar a não queimar a comida.',
          price: 450.00,
          image_url: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Jogo de Pratos Porto Brasil',
          description: 'Pratos sofisticados para servir jantares especiais aos amigos.',
          price: 350.00,
          image_url: 'https://images.unsplash.com/photo-1589987593170-c5b62a93946a?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Cota Lua de Mel: Jantar Romântico',
          description: 'Um jantar inesquecível a dois durante a nossa viagem de mel.',
          price: 200.00,
          image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Cota Lua de Mel: Passeio de Escuna',
          description: 'Um passeio incrível pelas praias paradisíacas da nossa lua de mel.',
          price: 150.00,
          image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Cota Lua de Mel: Diária de Hotel',
          description: 'Contribuição para uma noite especial em uma acomodação premium.',
          price: 500.00,
          image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Air Fryer Premium',
          description: 'Para cozinharmos de forma saudável e, claro, super rápida.',
          price: 400.00,
          image_url: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Cafeteira Nespresso',
          description: 'Café expresso quentinho para nos manter acordados e felizes.',
          price: 600.00,
          image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Liquidificador Turbo Power',
          description: 'Para sucos, vitaminas e bolos deliciosos de domingo.',
          price: 180.00,
          image_url: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Jogo de Taças de Cristal',
          description: 'Taças elegantes para brindarmos à vida e ao nosso amor.',
          price: 250.00,
          image_url: 'https://images.unsplash.com/photo-1574926053821-79c5e338a933?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Faqueiro Inox 76 Peças',
          description: 'Talheres completos e brilhantes para compor nossa mesa posta.',
          price: 320.00,
          image_url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Smart TV 50" 4K',
          description: 'Para nossas maratonas de séries e filmes agarradinhos.',
          price: 2200.00,
          image_url: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=300&auto=format&fit=crop',
        },
        {
          name: 'Adega de Vinhos Climatizada',
          description: 'Para guardar e climatizar nossos vinhos favoritos.',
          price: 950.00,
          image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=300&auto=format&fit=crop',
        },
      ];

      for (const giftDto of defaultGifts) {
        await this.create(giftDto);
      }
      console.log('Carga inicial de presentes semeada com sucesso!');
    }
  }

  async findAll(): Promise<Gift[]> {
    return await this.giftsRepository.find({
      order: { price: 'ASC' },
    });
  }

  async create(createGiftDto: CreateGiftDto): Promise<Gift> {
    const gift = this.giftsRepository.create(createGiftDto);
    return await this.giftsRepository.save(gift);
  }

  async claim(id: number, claimGiftDto: ClaimGiftDto): Promise<Gift> {
    const gift = await this.giftsRepository.findOneBy({ id });
    if (!gift) {
      throw new NotFoundException(`Presente com ID ${id} não encontrado`);
    }

    if (gift.status !== 'available') {
      throw new BadRequestException(`Presente já reservado ou confirmado`);
    }

    gift.buyer_name = claimGiftDto.buyer_name;
    gift.buyer_phone = claimGiftDto.buyer_phone;
    gift.payment_method = claimGiftDto.payment_method;
    gift.status = 'claimed';
    gift.claimed_at = new Date();

    return await this.giftsRepository.save(gift);
  }

  async confirm(id: number): Promise<Gift> {
    const gift = await this.giftsRepository.findOneBy({ id });
    if (!gift) {
      throw new NotFoundException(`Presente com ID ${id} não encontrado`);
    }

    gift.status = 'confirmed';
    return await this.giftsRepository.save(gift);
  }
}

