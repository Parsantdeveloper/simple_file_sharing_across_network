/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `file_contents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "file_contents" DROP COLUMN "updatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
