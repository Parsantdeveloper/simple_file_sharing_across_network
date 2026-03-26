import roomRepository from "./room.repository";
import { decrypt } from "../../libs/encryption";
import {hashPassword} from "../../utils/hash";
import { roomDeleteQueue } from "../../libs/queues/room.queue";
import { AppError } from "../../utils/AppError";
class RoomService {
  async onBoarding(ipAddress: string) {
    const roomData = await roomRepository.onBoarding(ipAddress);
    if(roomData.newRoom===true){
      await roomDeleteQueue.add("room-delete",{
        roomId:roomData.id,
      },
      {
        delay:1000*60*60*24, // 24 hours delay before deletion
        attempts: 3, // retry up to 3 times if it fails
         backoff: {
            type: "exponential",
            delay: 1000, // initial delay of 1 second
         },
         jobId: `delete-room-${roomData.id}` // unique job ID to prevent duplicates
      }
      );
    }
    let decryptedContent: string | null = null;

    // Safe check before decrypting
    if (roomData.textContent?.content) {
      decryptedContent = decrypt(roomData.textContent.content as unknown as { iv: string; content: string; tag: string });
    }

    return {
      ...roomData,
      textContent: roomData.textContent
        ? {
            ...roomData.textContent,
            content: decryptedContent, // decrypted or null
          }
        : null,
    };
  }

  async updatePassword(roomId:string,password:string){
    const hashedPassword = await hashPassword(password);
    if(!hashedPassword){
      throw  AppError.badRequest("Failed to hash password");
    }

    const passwordUpdated = await roomRepository.updatePassword(roomId,hashedPassword);
    if(!passwordUpdated){
      throw AppError.conflict("Failed to update password");
    }
  }

  async deleteRoom(roomId:string){
    const roomDeleted = await roomRepository.deleteRoom(roomId);
    if(!roomDeleted){
      throw AppError.conflict("Failed to delete room");
    }
    return roomDeleted;
  }
}

export default new RoomService();