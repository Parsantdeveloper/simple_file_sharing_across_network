
import prisma from "config/prisma";
import { createTextContentType } from "./text.schema";

class textRepository{
  
    async upsertTextContent(textContent: { roomId: string; content: {iv: string; content: string; tag: string} }) {
       let textcontent = await prisma.textContent.upsert({
            where:{
                roomId:textContent.roomId
            },
            update:{
                content:textContent.content
            },
            create:{
                content:textContent.content,
                roomId:textContent.roomId
            }
       })
       return textcontent;
    }

}

export default new textRepository();