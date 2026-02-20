export class CreateProcessoDto {
  numero: string;
  titulo: string;
  tribunal?: string;
  status?: string;
  clienteId: string; // ID do cliente vinculado
  advogadoId: string; // ID do advogado vinculado
  tipo?: string;
}