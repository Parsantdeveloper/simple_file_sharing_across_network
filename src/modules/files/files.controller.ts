// files.controller.ts
import { Request, Response } from "express";
import { fileContentSchema, deleteFileParamsSchema,getFilesByRoomIdParamsSchema } from "./files.schema";
import filesService from "./files.service";
import { asyncHandler } from "../../utils/AsyncHandler";
import { AppError } from "../../utils/AppError";

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) throw AppError.badRequest("No file uploaded");

    const publicId = (req.file as any).filename;

    const fileContent = fileContentSchema.parse({
        roomId: req.body.roomId,
        fileUrl: req.file.path,
        fileName: req.file.originalname, // Original filename for display
        fileType: req.file.mimetype,
        publicId: publicId, // Cloudinary public_id for deletion
    });

    const file = await filesService.createFileContent(fileContent);

    res.status(201).json({
        success: true,
        message: "File uploaded",
        data: file,
    });
});

export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
    const { roomId, fileId } = deleteFileParamsSchema.parse(req.params);

    const file = await filesService.deleteFile(roomId, fileId);

    res.json({
        success: true,
        message: "File deleted",
        data: file,
    });
});

export const getFilesByRoomId = asyncHandler(async (req: Request, res: Response) => {
    const { roomId } = getFilesByRoomIdParamsSchema.parse(req.params);
    
    const files = await filesService.getFilesByRoomId(roomId);
    res.json({
        success: true,
        message: "Files retrieved",
        data: files,
    });
});