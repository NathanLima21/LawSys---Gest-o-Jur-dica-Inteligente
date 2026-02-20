import { Controller, Post, Body, Get, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('processo')
@UseGuards(JwtAuthGuard)
export class ProcessoController {
  constructor(private readonly processoService: ProcessoService) {}

  @Post()
  create(@Body() createDto: CreateProcessoDto, @GetUser() user: any) {
    return this.processoService.create(createDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.processoService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProcessoDto) {
    return this.processoService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: any) {
    // AQUI ESTAVA O ERRO: Adicionamos o user.userId como segundo argumento
    return this.processoService.remove(id, user.userId);
  }
}