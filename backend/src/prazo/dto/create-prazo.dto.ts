export class CreatePrazoDto {
  descricao: string;
  dataLimite: Date | string; // O NestJS aceita string de data (ISO) e o Prisma converte
  finalizado?: boolean; // O ? indica que é opcional, pois o padrão é false
  processoId: string;
}
