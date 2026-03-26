
import z from "zod";


export const deleteRoomSchema = z.object({
    roomId: z.string().uuid("Invalid room ID format"),
})

export type DeleteRoomInput = z.infer<typeof deleteRoomSchema>;

export const updatePasswordSchema=z.object({
    roomId: z.string().uuid("Invalid room ID format"),
    password: z.string().min(6,"Password must be at least 6 characters long")
})

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export const onBoardingSchema = z.object({
    ipAddress: z.string("Invalid IP address format")
});

export type OnBoardingInput = z.infer<typeof onBoardingSchema>;

export const verifyPasswordSchema = z.object({
    roomId: z.string().uuid("Invalid room ID format"),
    password: z.string().min(6,"Password must be at least 6 characters long")
})

export type VerifyPasswordInput = z.infer<typeof verifyPasswordSchema>;