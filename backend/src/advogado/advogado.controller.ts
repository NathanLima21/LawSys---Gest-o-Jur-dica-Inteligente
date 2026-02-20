import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdvogadoService } from './advogado.service';
import { CreateAdvogadoDto } from './dto/create-advogado.dto';
import { UpdateAdvogadoDto } from './dto/update-advogado.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ajuste o caminho se necessário

@Controller('advogado')
export class AdvogadoController {
  constructor(private readonly advogadoService: AdvogadoService) {}

  @Post()
  create(@Body() createAdvogadoDto: CreateAdvogadoDto) {
    return this.advogadoService.create(createAdvogadoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.advogadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advogadoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdvogadoDto: UpdateAdvogadoDto,
  ) {
    return this.advogadoService.update(id, updateAdvogadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advogadoService.remove(id);
  }
}
