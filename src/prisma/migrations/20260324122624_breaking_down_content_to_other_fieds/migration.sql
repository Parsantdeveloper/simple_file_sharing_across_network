/*
  Warnings:

  - The primary key for the `file_contents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `file_contents` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `file_contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `file_contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `file_contents` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `file_contents` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "file_contents" DROP CONSTRAINT "file_contents_pkey",
DROP COLUMN "content",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "file_contents_pkey" PRIMARY KEY ("id");
