
import { ApiResponse } from "utils/ApiResponce";
import { Request,Response,NextFunction } from "express";
import roomService from "./room.service"


export const onBoardingController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let {ipAddress}:{ipAddress:string}=req.body as {ipAddress:string};
        let room=await roomService.onBoarding(ipAddress);
        res.status(200).json(ApiResponse.success(room,{},"Room created successfully"));
    } catch (error) {
        next(error);
    }
}