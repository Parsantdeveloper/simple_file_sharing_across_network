import { ApiResponse } from "../../utils/ApiResponce";
import { ConflictError } from "../../utils/error";
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
            throw new ConflictError("Failed to upsert text content");
         }
    }

    // async getTextContent(roomId:string)
}

export default new textService();