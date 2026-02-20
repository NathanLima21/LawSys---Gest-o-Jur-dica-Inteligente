export class CreateFinanceiroDto {
  descricao: string;
  valor: number;
  tipo: string; // 'ENTRADA' ou 'SAIDA'
  status: string; // 'PAGO' ou 'PENDENTE'
  processoId: string;
}
