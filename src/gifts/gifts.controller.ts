import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { ClaimGiftDto } from './dto/claim-gift.dto';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  findAll() {
    return this.giftsService.findAll();
  }

  @Post()
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftsService.create(createGiftDto);
  }

  @Post(':id/claim')
  claim(
    @Param('id', ParseIntPipe) id: number,
    @Body() claimGiftDto: ClaimGiftDto,
  ) {
    return this.giftsService.claim(id, claimGiftDto);
  }

  @Post(':id/confirm')
  confirm(@Param('id', ParseIntPipe) id: number) {
    return this.giftsService.confirm(id);
  }
}
