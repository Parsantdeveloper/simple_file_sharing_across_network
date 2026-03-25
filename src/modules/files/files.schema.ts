
import z, { file } from "zod";

export const fileContentSchema = z.object({
    roomId: z.string().uuid(),
    fileUrl: z.string().url(),
    fileName: z.string(),
    fileType: z.string(),
    publicId: z.string(),

})


export type FileContentType = z.infer<typeof fileContentSchema>;


export const deleteFileParamsSchema=z.object({
    roomId:z.string().uuid(),
    fileId:z.string().uuid(),
})

export const getFilesByRoomIdParamsSchema=z.object({
    roomId:z.string().uuid(),
})