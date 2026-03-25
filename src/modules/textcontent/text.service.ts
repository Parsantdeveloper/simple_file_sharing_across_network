import { AppError } from "@/utils/AppError";
import textRepository from "./text.repository";
import { createTextContentType } from "./text.schema";
import { encrypt,decrypt } from "../../libs/encryption";

class textService{

    async upsertTextContent(textContent:createTextContentType){
         try {
            const encryptedContent = encrypt(textContent.content);
            const updatedContent = await textRepository.upsertTextContent({
                roomId:textContent.roomId,
                content:encryptedContent})
            return updatedContent;
         } catch (error) {
            throw  AppError.conflict("Failed to upsert text content");
         }
    }

    // async getTextContent(roomId:string)
}

export default new textService();