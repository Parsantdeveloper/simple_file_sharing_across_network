// files.repository.ts
import prisma from "@/config/prisma";
import { FileContentType } from "./files.schema";

class FilesRepository {
  getFileCount(roomId: string) {
    return prisma.fileContent.count({ where: { roomId } });
  }

  getFileById(fileId: string) {
    return prisma.fileContent.findUnique({ where: { id: fileId } });
  }

  createFileContent(fileContent: FileContentType) {
    return prisma.fileContent.create({ data: fileContent });
  }

  deleteFile(fileId: string) {
    return prisma.fileContent.delete({ where: { id: fileId } });
  }

  getFilesByRoomId(roomId:string){
    return prisma.fileContent.findMany({ where: { roomId } });
  }
}

export default new FilesRepository();