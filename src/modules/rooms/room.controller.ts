
import { ApiResponse } from "../../utils/ApiResponce";
import { Request, Response, NextFunction } from "express";
import roomService from "./room.service"
import { asyncHandler } from "../../utils/AsyncHandler";
import { onBoardingSchema } from "./room.schema"
export const onBoardingController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    let { ipAddress } = onBoardingSchema.parse(req.body);
    let room = await roomService.onBoarding(ipAddress);
    res.status(200).json(ApiResponse.success(room, {}, "Room created successfully"));
}
)

