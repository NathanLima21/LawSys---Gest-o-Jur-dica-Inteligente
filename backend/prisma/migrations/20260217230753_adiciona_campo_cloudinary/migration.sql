/*
  Warnings:

  - Added the required column `oab` to the `Advogado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Documento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Advogado" ADD COLUMN     "oab" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Documento" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publicId" TEXT NOT NULL;
