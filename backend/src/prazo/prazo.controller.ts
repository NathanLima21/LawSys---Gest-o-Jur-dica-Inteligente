import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PrazoService } from './prazo.service';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';

@Controller('prazo')
export class PrazoController {
  constructor(private readonly prazoService: PrazoService) {}

  @Post()
  create(@Body() createPrazoDto: CreatePrazoDto) {
    return this.prazoService.create(createPrazoDto);
  }

  @Get()
  findAll(@Query('processoId') processoId: string) {
    return this.prazoService.findAll(processoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prazoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrazoDto: UpdatePrazoDto) {
    return this.prazoService.update(id, updatePrazoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prazoService.remove(id);
  }
}