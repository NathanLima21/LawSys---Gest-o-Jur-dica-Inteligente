export class CreateClienteDto {
  nome: string;
  cpf_cnpj: string;
  email?: string; // O '?' indica que é opcional
  telefone?: string;
  endereco?: string;
}
