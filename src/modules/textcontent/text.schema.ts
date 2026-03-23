import z from "zod";

export const createTextContentSchema=z.object({
    roomId:z.string(),
    content:z.string()
})

export  type createTextContentType=z.infer<typeof createTextContentSchema>;