
import { Request,Response,NextFunction } from "express";
import { ApiResponse } from "../../utils/ApiResponce";
import { ConflictError } from "../../utils/error";
import textService from "./text.service";
import { createTextContentSchema } from "./text.schema";


export const upsertTextContentController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const textContent = createTextContentSchema.parse(req.body);
        const result = await textService.upsertTextContent(textContent);
        res.status(200).json( ApiResponse.success(result,{},"Text content upserted successfully") );
    } catch (error) {
        next(error);
    }
}
