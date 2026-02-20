export class CreateDocumentoDto {
  nome: string; // O nome que o advogado quer dar ao arquivo (ex: "RG do Cliente")
  processoId: string; // A qual processo esse arquivo pertence

  // A URL e o TIPO você vai remover daqui!
  // Eles serão preenchidos pelo Service depois que o upload terminar.
}
