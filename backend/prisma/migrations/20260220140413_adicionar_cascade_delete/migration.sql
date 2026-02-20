-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_processoId_fkey";

-- DropForeignKey
ALTER TABLE "Financeiro" DROP CONSTRAINT "Financeiro_processoId_fkey";

-- DropForeignKey
ALTER TABLE "Prazo" DROP CONSTRAINT "Prazo_processoId_fkey";

-- AddForeignKey
ALTER TABLE "Prazo" ADD CONSTRAINT "Prazo_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Financeiro" ADD CONSTRAINT "Financeiro_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
