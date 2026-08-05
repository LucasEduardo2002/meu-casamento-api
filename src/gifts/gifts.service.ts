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
        { old: 'Gela-água ou Bebedouro', new: 'Gelagua ou Bebedouro' },
        { old: 'Secador de Louça', new: 'Escorredor de louça' }
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
        image_url: '/Lista-presentes/panelas-ceramica.jpg',
      },
      {
        name: 'Aparelho de Jantar Completo',
        description: 'Conjunto de pratos para refeições.',
        price: 350.00,
        image_url: '/Lista-presentes/aparelho-de-jantar.webp',
      },
      {
        name: 'Airfryer',
        description: 'Fritadeira elétrica para preparar alimentos com rapidez.',
        price: 400.00,
        image_url: '/Lista-presentes/air-frayer.webp',
      },
      {
        name: 'Liquidificador ou Processador de Alimentos',
        description: 'Para preparar sucos, vitaminas e receitas.',
        price: 100.00,
        image_url: '/Lista-presentes/liquidificador.webp',
      },
      {
        name: 'Conjunto de Taças',
        description: 'Taças de vidro para brindar momentos especiais.',
        price: 150.00,
        image_url: '/Lista-presentes/jogo_de_tacas.webp',
      },
      {
        name: 'Faqueiro Inox',
        description: 'Conjunto de talheres em aço inox.',
        price: 80.00,
        image_url: '/Lista-presentes/talheres.jpg',
      },
      {
        name: 'Garrafa Térmica de Café',
        description: 'Garrafa térmica para café ou chá.',
        price: 60.00,
        image_url: '/Lista-presentes/garrafa_de_cafe.png',
      },
      {
        name: 'Batedeira Planetária',
        description: 'Batedeira para auxiliar no preparo de receitas.',
        price: 350.00,
        image_url: '/Lista-presentes/batedeira.webp',
      },
      {
        name: 'Micro-ondas 220v',
        description: 'Micro-ondas para aquecer as refeições.',
        price: 580.00,
        image_url: '/Lista-presentes/microondas.png',
      },
      {
        name: 'Sanduicheira',
        description: 'Sanduicheira para fazer lanches.',
        price: 80.00,
        image_url: '/Lista-presentes/sanduicheira.png',
      },
      {
        name: 'Gelagua ou Bebedouro',
        description: 'Gelagua para termos água gelada sempre à disposição.',
        price: 450.00,
        image_url: '/Lista-presentes/gelagua.png',
      },
      {
        name: 'Ventilador de Coluna',
        description: 'Ventilador para os dias quentes.',
        price: 180.00,
        image_url: '/Lista-presentes/ventilador.png',
      },
      {
        name: 'Conjunto de Copos',
        description: 'Copos de vidro para uso diário.',
        price: 80.00,
        image_url: '/Lista-presentes/conjunto_copos.png',
      },
      {
        name: 'Jogo de Assadeiras e Travessas',
        description: 'Travessas de vidro para assar e servir.',
        price: 180.00,
        image_url: '/Lista-presentes/assadeira.png',
      },
      {
        name: 'Conjunto de Potes para Mantimentos',
        description: 'Conjunto de potes organizadores.',
        price: 120.00,
        image_url: '/Lista-presentes/potes_mantimento.png',
      },
      {
        name: 'Kit de Utensílios de Silicone',
        description: 'Utensílios de silicone para cozinha.',
        price: 95.00,
        image_url: '/Lista-presentes/utensilios_cozinha.png',
      },
      {
        name: 'Tábua de Corte de Bambu',
        description: 'Tábua de corte em bambu.',
        price: 70.00,
        image_url: '/Lista-presentes/tabua_bambu.png',
      },
      {
        name: 'Kit para Churrasco',
        description: 'Faca, garfo e pegador para churrasco.',
        price: 160.00,
        image_url: '/Lista-presentes/kit_churrasco.png',
      },
      {
        name: 'Escorredor de louça',
        description: 'Escorredor de louças para a cozinha.',
        price: 110.00,
        image_url: '/Lista-presentes/escorredor_louca.png',
      },
      {
        name: 'Boleira de Vidro',
        description: 'Boleira com tampa de vidro.',
        price: 90.00,
        image_url: '/Lista-presentes/boleira_vidro.png',
      },
      {
        name: 'Conjunto de Talheres de Sobremesa',
        description: 'Talheres pequenos para servir sobremesas.',
        price: 60.00,
        image_url: '/Lista-presentes/talheres_sobremesa.png',
      },
      {
        name: 'Jogo de Lençol de Algodão Queen',
        description: 'Jogo de lençol queen de algodão.',
        price: 250.00,
        image_url: '/Lista-presentes/lencol_queen.png',
      },
      {
        name: 'Edredom Queen Cobre-Leito',
        description: 'Edredom queen confortável.',
        price: 320.00,
        image_url: '/Lista-presentes/edredom_queen.png',
      },
      {
        name: 'Kit de Travesseiros Confort',
        description: 'Travesseiros para o quarto.',
        price: 120.00,
        image_url: '/Lista-presentes/travesseiros.png',
      },
      {
        name: 'Protetor de Colchão Impermeável',
        description: 'Protetor impermeável para colchão queen.',
        price: 110.00,
        image_url: '/Lista-presentes/protetor_colchao.png',
      },
      {
        name: 'Jogo de Toalhas de Banho',
        description: 'Jogo de toalhas de banho.',
        price: 180.00,
        image_url: '/Lista-presentes/toalhas_banho.png',
      },
      {
        name: 'Toalhas de Mesa e Jogo Americano',
        description: 'Toalha de mesa e jogo americano.',
        price: 120.00,
        image_url: '/Lista-presentes/toalhas_mesa.png',
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
      },
      {
        name: 'Panela de Pressão Cerâmica',
        description: 'Panela de pressão com revestimento cerâmico, segura e eficiente.',
        price: 250.00,
        image_url: '/Lista-presentes/panela_pressao_ceramica.png',
      },
      {
        name: 'Panela de pressão elétrica',
        description: 'Panela de pressão elétrica multifuncional para facilitar o dia a dia.',
        price: 380.00,
        image_url: '/Lista-presentes/panela_pressao_eletrica.png',
      },
      {
        name: 'Kit 6 Jogo Americano Redondo Sousplat Supla Mesa Posta',
        description: 'Conjunto com 6 sousplats redondos para uma mesa posta elegante.',
        price: 60.00,
        image_url: '/Lista-presentes/jogo_americano_sousplat.png',
      },
      {
        name: 'Jogo Com 6 Taças De Sobremesa Diamante',
        description: 'Conjunto com 6 taças de vidro estilo diamante para sobremesa.',
        price: 60.00,
        image_url: '/Lista-presentes/tacas_sobremesa_diamante.png',
      },
      {
        name: 'Luminária De Mesa Abajur',
        description: 'Luminária de mesa/abajur com design moderno para quarto ou escritório.',
        price: 70.00,
        image_url: '/Lista-presentes/luminaria_mesa_abajur.png',
      },
      {
        name: 'Mop Giratório Esfregão Cesto Inox',
        description: 'Mop giratório com esfregão e cesto em aço inox para limpeza prática.',
        price: 70.00,
        image_url: '/Lista-presentes/mop_giratorio_inox.png',
      },
      {
        name: 'Kit 3 Formas Para Bolo Torta Antiaderente',
        description: 'Conjunto com 3 formas antiaderentes de tamanhos variados para bolo e torta.',
        price: 50.00,
        image_url: '/Lista-presentes/formas_bolo_antiaderente.png',
      },
      {
        name: 'Kit Jarra de Vidro e Copos De Vidro',
        description: 'Jogo com jarra e copos de vidro trabalhados para servir bebidas.',
        price: 130.00,
        image_url: '/Lista-presentes/kit_jarra_copos_vidro.png',
      },
      {
        name: 'Kit 2 Mantas Para Sofá',
        description: 'Conjunto com 2 mantas aconchegantes e decorativas para sofá.',
        price: 60.00,
        image_url: '/Lista-presentes/kit_mantas_sofa.png',
      },
      {
        name: 'Kit 10 Potes Vidro Hermético',
        description: 'Conjunto de 10 potes de vidro com tampa hermética para conservar alimentos.',
        price: 100.00,
        image_url: '/Lista-presentes/kit_potes_hermetico.png',
      },
      {
        name: 'Espelho 90x40cm Corpo Inteiro',
        description: 'Espelho retangular grande para corpo inteiro com moldura discreta.',
        price: 100.00,
        image_url: '/Lista-presentes/espelho_corpo_inteiro.png',
      },
      {
        name: 'Frigideira Cerâmica Antiaderente',
        description: 'Frigideira com revestimento cerâmico antiaderente para grelhar com facilidade.',
        price: 80.00,
        image_url: '/Lista-presentes/frigideira_ceramica.png',
      },
      {
        name: 'Relógio De Parede 30cm Grande',
        description: 'Relógio de parede moderno e silencioso de 30cm para decoração da casa.',
        price: 60.00,
        image_url: '/Lista-presentes/relogio_parede.png',
      },
      {
        name: 'Organizador Giratório de Temperos 360°',
        description: 'Organizador giratório 360 graus para temperos e condimentos na cozinha.',
        price: 70.00,
        image_url: '/Lista-presentes/organizador_temperos.png',
      },
      {
        name: 'Kit Bowls Tigelas de Inox com Tampa Plástica, 3 Unidades',
        description: 'Conjunto com 3 tigelas de aço inox com tampas plásticas para conservar alimentos.',
        price: 100.00,
        image_url: '/Lista-presentes/kit_bowls_inox.png',
      },
      {
        name: 'Pipoqueira 220V',
        description: 'Pipoqueira elétrica 220V para fazer pipoca crocante e saudável sem óleo.',
        price: 150.00,
        image_url: '/Lista-presentes/pipoqueira_eletrica.png',
      },
      {
        name: 'Multiprocessador 220v',
        description: 'Multiprocessador potente de alimentos 220V para triturar, fatiar e ralar.',
        price: 300.00,
        image_url: '/Lista-presentes/multiprocessador.png',
      },
      {
        name: 'operação lua de mel',
        description: 'Ajude os noivos a curtirem a lua de mel com qualquer valor ou cotas.',
        price: 100.00,
        image_url: '/Lista-presentes/operacao_lua_de_mel.png',
      }
    ];

    // Delete removed items if they exist and are available
    try {
      const itemsToDelete = [
        'Lixeira Grande para Cozinha',
        'Conjunto de Panos de Prato',
        'Manta Decorativa para Sofá',
        'Aspirador de Pó Vertical',
        'Panela de Pressão Elétrica',
        'Kit 6 Jogo Americano Redondo (Sousplat)',
        'Jogo com 6 Taças de Sobremesa Diamante',
        'Luminária de Mesa (Abajur)',
        'Mop Giratório com Cesto Inox',
        'Kit 3 Formas para Bolo e Torta Antiaderente',
        'Kit Jarra e Copos de Vidro',
        'Kit 2 Mantas para Sofá',
        'Kit de Mantas para Sofá (2 unidades)',
        'Kit 10 Potes de Vidro Herméticos',
        'Espelho 90x40cm (Corpo Inteiro)'
      ];
      for (const itemName of itemsToDelete) {
        const toDelete = await this.giftsRepository.findOneBy({ name: itemName, status: 'available' });
        if (toDelete) {
          await this.giftsRepository.remove(toDelete);
        }
      }
    } catch (e) {
      console.warn('Erro ao tentar remover itens excluídos:', e.message);
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

