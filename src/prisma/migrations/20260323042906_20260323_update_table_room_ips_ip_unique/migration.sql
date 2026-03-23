/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `room_ips` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ipAddress]` on the table `room_ips` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "room_ips_roomId_ipAddress_key";

-- CreateIndex
CREATE UNIQUE INDEX "room_ips_id_key" ON "room_ips"("id");

-- CreateIndex
CREATE UNIQUE INDEX "room_ips_ipAddress_key" ON "room_ips"("ipAddress");
