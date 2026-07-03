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
    // Rename old items to keep consistency without duplicating
    try {
      const renames = [
        { old: 'Airfryer (Fritadeira Elétrica Premium)', new: 'Airfryer' },
        { old: 'Forno Micro-ondas Espelhado', new: 'Micro-ondas 220v' },
        { old: 'Gela-água ou Bebedouro', new: 'Gelagua ou Bebedouro' }
      ];
      for (const rename of renames) {
        const oldGift = await this.giftsRepository.findOneBy({ name: rename.old });
        if (oldGift) {
          oldGift.name = rename.new;
          await this.giftsRepository.save(oldGift);
        }
      }
    } catch (e) {
      console.warn('Erro ao aplicar renomeações de semente:', e.message);
    }

    const defaultGifts: CreateGiftDto[] = [
      {
        name: 'Jogo de Panelas de Cerâmica',
        description: 'Jogo de panelas com revestimento cerâmico.',
        price: 480.00,
        image_url: 'https://images.unsplash.com/photo-1584990347163-2b86b71390d6?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Aparelho de Jantar Completo',
        description: 'Conjunto de pratos para refeições.',
        price: 350.00,
        image_url: 'https://images.unsplash.com/photo-1591632288574-a387f820a1ca?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Airfryer',
        description: 'Fritadeira elétrica para preparar alimentos com rapidez.',
        price: 400.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1711051351678-658b273f71d4?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Liquidificador ou Processador de Alimentos',
        description: 'Para preparar sucos, vitaminas e receitas.',
        price: 100.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1718043036199-d98bef36af46?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Conjunto de Taças',
        description: 'Taças de vidro para brindar momentos especiais.',
        price: 150.00,
        image_url: 'https://images.unsplash.com/photo-1574494349420-ecf8ccbff974?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Faqueiro Inox',
        description: 'Conjunto de talheres em aço inox.',
        price: 80.00,
        image_url: 'https://images.unsplash.com/photo-1503197553955-b4eafae3e08e?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Garrafa Térmica de Café',
        description: 'Garrafa térmica para café ou chá.',
        price: 60.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1752846974618-e14290df59c1?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Batedeira Planetária',
        description: 'Batedeira para auxiliar no preparo de receitas.',
        price: 350.00,
        image_url: 'https://images.unsplash.com/photo-1595644258096-69155da290fd?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Aspirador de Pó Vertical',
        description: 'Aspirador vertical para limpeza prática.',
        price: 170.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1661679038354-cc7279833968?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Micro-ondas 220v',
        description: 'Micro-ondas para aquecer as refeições.',
        price: 580.00,
        image_url: 'https://images.unsplash.com/photo-1608384156808-418b5c079968?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Sanduicheira',
        description: 'Sanduicheira para fazer lanches.',
        price: 80.00,
        image_url: 'https://images.unsplash.com/photo-1588869712605-dfcd7f24e652?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Gelagua ou Bebedouro',
        description: 'Gelagua para termos água gelada sempre à disposição.',
        price: 450.00,
        image_url: '/gelagua.png',
      },
      {
        name: 'Ventilador de Coluna',
        description: 'Ventilador para os dias quentes.',
        price: 180.00,
        image_url: 'https://images.unsplash.com/photo-1559719740-f4d59cf117cb?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Conjunto de Copos',
        description: 'Copos de vidro para uso diário.',
        price: 80.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1670426502195-6544f2debf1b?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Jogo de Assadeiras e Travessas',
        description: 'Travessas de vidro para assar e servir.',
        price: 180.00,
        image_url: 'https://images.unsplash.com/photo-1720421920272-456e78a75e2e?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Conjunto de Potes para Mantimentos',
        description: 'Conjunto de potes organizadores.',
        price: 120.00,
        image_url: 'https://images.unsplash.com/photo-1621318551436-68573392fd5c?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Kit de Utensílios de Silicone',
        description: 'Utensílios de silicone para cozinha.',
        price: 95.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1776720097326-9cf81f1560c5?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Tábua de Corte de Bambu',
        description: 'Tábua de corte em bambu.',
        price: 70.00,
        image_url: 'https://images.unsplash.com/photo-1617695615794-a5abcece0f48?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Kit para Churrasco',
        description: 'Faca, garfo e pegador para churrasco.',
        price: 160.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1693221705527-d46b2477f5cd?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Secador de Louça',
        description: 'Escorredor de louças para a cozinha.',
        price: 110.00,
        image_url: 'https://images.unsplash.com/photo-1601599561263-591607ab1606?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Boleira de Vidro',
        description: 'Boleira com tampa de vidro.',
        price: 90.00,
        image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Conjunto de Talheres de Sobremesa',
        description: 'Talheres pequenos para servir sobremesas.',
        price: 60.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1666739031577-1edb0ca25a60?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Jogo de Lençol de Algodão Queen',
        description: 'Jogo de lençol queen de algodão.',
        price: 250.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1670869816769-c64fbc7b9c4c?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Edredom Queen Cobre-Leito',
        description: 'Edredom queen confortável.',
        price: 320.00,
        image_url: 'https://images.unsplash.com/photo-1686827986080-8ee55b055a2f?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Kit de Travesseiros Confort',
        description: 'Travesseiros para o quarto.',
        price: 120.00,
        image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Protetor de Colchão Impermeável',
        description: 'Protetor impermeável para colchão queen.',
        price: 110.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1664015821142-32f429a6608f?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Jogo de Toalhas de Banho',
        description: 'Jogo de toalhas de banho.',
        price: 180.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1684445034670-b36aca25c25a?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Toalhas de Mesa e Jogo Americano',
        description: 'Toalha de mesa e jogo americano.',
        price: 120.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1670869816769-c64fbc7b9c4c?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Conjunto de Panos de Prato',
        description: 'Panos de prato para cozinha.',
        price: 50.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1750041545838-f2ef7b41599a?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Lixeira de Inox (Cozinha/Banheiro)',
        description: 'Lixeira de inox com pedal.',
        price: 90.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1664189121552-f6d1dbf2a45c?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Porta-sabonete Líquido e Porta-escovas',
        description: 'Porta-sabonete líquido e porta-escovas para banheiro.',
        price: 75.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1679064286720-9f28c0f012d8?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Tábua de Passar Roupa',
        description: 'Tábua de passar roupa.',
        price: 130.00,
        image_url: 'https://images.unsplash.com/photo-1540544093-b0880061e1a5?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Fruteira de Mesa',
        description: 'Fruteira para mesa.',
        price: 110.00,
        image_url: 'https://images.unsplash.com/photo-1605280179505-db8b72e318b7?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Manta Decorativa para Sofá',
        description: 'Manta decorativa para sofá.',
        price: 95.00,
        image_url: 'https://plus.unsplash.com/premium_photo-1678375722586-b5eef2972f4f?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Mesa de Centro de Sala',
        description: 'Mesa de centro para sala.',
        price: 250.00,
        image_url: 'https://images.unsplash.com/photo-1724582586580-8b52c02e99dd?q=80&w=300&auto=format&fit=crop',
      },
      {
        name: 'Sapateira Organizadora',
        description: 'Sapateira organizadora.',
        price: 130.00,
        image_url: 'https://images.unsplash.com/photo-1478887011962-709960f8ced8?q=80&w=300&auto=format&fit=crop',
      }
    ];

    // Delete 'Lixeira Grande para Cozinha' if it exists and is available
    try {
      const toDelete = await this.giftsRepository.findOneBy({ name: 'Lixeira Grande para Cozinha', status: 'available' });
      if (toDelete) {
        await this.giftsRepository.remove(toDelete);
      }
    } catch (e) {
      console.warn('Erro ao tentar remover lixeira excluída:', e.message);
    }

    for (const giftDto of defaultGifts) {
      const exists = await this.giftsRepository.findOneBy({ name: giftDto.name });
      if (!exists) {
        await this.create(giftDto);
      } else {
        exists.description = giftDto.description || '';
        exists.price = giftDto.price;
        exists.image_url = giftDto.image_url || '';
        await this.giftsRepository.save(exists);
      }
    }
    console.log('Carga de presentes semeada/verificada com sucesso!');
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

