// files.service.ts
import filesRepository from "./files.repository";
import { FileContentType } from "./files.schema";
import { destroy } from "@/libs/files";
import redis from "@/libs/redis";
import { AppError } from "@/utils/AppError";

class FilesService {
    private readonly MAX_FILES = 3;
    private readonly CACHE_TTL = 3600;

    private getCacheKey(roomId: string) {
        return `file:${roomId}:count`;
    }

    async createFileContent(fileContent: FileContentType) {
        const cacheKey = this.getCacheKey(fileContent.roomId);

        // Check cache
        const cached = await redis.get(cacheKey);
        const count = cached ? parseInt(cached) : await filesRepository.getFileCount(fileContent.roomId);

        if (count >= this.MAX_FILES) {
            throw AppError.badRequest(`Maximum ${this.MAX_FILES} files per room`);
        }

        // Create file
        const file = await filesRepository.createFileContent(fileContent);

        // Update cache
        await redis.incr(cacheKey);
        await redis.expire(cacheKey, this.CACHE_TTL);

        return file;
    }

    async deleteFile(roomId: string, fileId: string) {
        // Get and verify file
        const file = await filesRepository.getFileById(fileId);

        if (!file) throw AppError.notFound("File not found");
        if (file.roomId !== roomId) throw AppError.forbidden("File not in this room");

        // Delete from DB
        await filesRepository.deleteFile(fileId);

        // Update cache : decrease count, but ensure it doesn't go negative
        await redis.decr(this.getCacheKey(roomId));
        const cacheKey = this.getCacheKey(roomId);
        // If count reaches 0, remove cache to avoid stale data
        const currentCount = await redis.get(cacheKey);
        if (currentCount === "0") {
            await redis.del(cacheKey);
        }
        // Delete from cloudinary
        if (file.publicId) {
            console.log("deleting from cloudinary with publicId:", file.publicId);
            destroy(file.publicId).catch(err =>
                console.error("Cloudinary deletion failed:", err)
            );
        }

        return file;
    }

    async getFilesByRoomId(roomId:string){
       const Files=await filesRepository.getFilesByRoomId(roomId);
       if(Files.length===0){
        throw AppError.notFound("No files found for this room");
       }
       return Files;
    }
}

export default new FilesService();