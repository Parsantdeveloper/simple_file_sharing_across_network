-- CreateTable
CREATE TABLE "file_contents" (
    "roomId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_contents_pkey" PRIMARY KEY ("roomId")
);

-- CreateIndex
CREATE INDEX "file_contents_roomId_idx" ON "file_contents"("roomId");

-- AddForeignKey
ALTER TABLE "file_contents" ADD CONSTRAINT "file_contents_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
