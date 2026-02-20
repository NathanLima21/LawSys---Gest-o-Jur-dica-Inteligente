import { Controller, Post, Body, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('cliente')
@UseGuards(JwtAuthGuard)
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(
    @Body() createClienteDto: CreateClienteDto,
    @GetUser() user: { userId: string },
  ) {
    const advogadoId = user.userId;
    return this.clienteService.create(createClienteDto, advogadoId);
  }

  @Get()
  async findAll(@GetUser() user: { userId: string }) {
    return this.clienteService.findAll(user.userId);
  }

  // AGORA DENTRO DA CLASSE CORRETAMENTE
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: { userId: string }) {
    return this.clienteService.remove(id, user.userId);
  }
} // <--- A classe termina aqui