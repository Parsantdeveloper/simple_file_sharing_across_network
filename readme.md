// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql"
  url      = env("DATABASE_URL")
}

model Room {
  id             String        @id @default(uuid())
  passwordHash   String?       // optional password protection
  encryptionKey  String?       // optional encryption key
  createdAt      DateTime      @default(now())
  expiresAt      DateTime?
  textContent    TextContent?
  files          File[]
  roomIPs        RoomIP[]
  linkRequests   LinkRequest[]
  fileUsage      FileUsage?

  @@map("rooms")
}

model RoomIP {
  id        Int      @id @default(autoincrement())
  room      Room     @relation(fields: [roomId], references: [id], onDelete: Cascade)
  roomId    String
  ipAddress String
  createdAt DateTime @default(now())

  @@unique([roomId, ipAddress])
  @@map("room_ips")
}

model TextContent {
  room      Room     @relation(fields: [roomId], references: [id], onDelete: Cascade)
  roomId    String   @id
  content   String
  updatedAt DateTime @updatedAt

  @@map("text_contents")
}

model File {
  id        String   @id @default(uuid())
  room      Room     @relation(fields: [roomId], references: [id], onDelete: Cascade)
  roomId    String
  fileName  String
  fileSize  Int
  filePath  String
  createdAt DateTime @default(now())
  expiresAt DateTime?

  @@map("files")
}

model FileUsage {
  room       Room   @relation(fields: [roomId], references: [id], onDelete: Cascade)
  roomId     String @id
  totalFiles Int    @default(0)
  totalSize  Int    @default(0)

  @@map("file_usage")
}

model LinkRequest {
  id        String   @id @default(uuid())
  room      Room     @relation(fields: [roomId], references: [id], onDelete: Cascade)
  roomId    String
  targetIP  String
  status    String   @default("pending") // "pending" | "accepted" | "rejected"
  createdAt DateTime @default(now())

  @@map("link_requests")
}

// Optional: access log
model AccessLog {
  id        Int      @id @default(autoincrement())
  room      Room?    @relation(fields: [roomId], references: [id], onDelete: Cascade)
  roomId    String?
  ipAddress String
  userAgent String?
  accessedAt DateTime @default(now())

  @@map("access_logs")
}