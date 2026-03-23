import roomRepository from "./room.repository";
import { decrypt } from "libs/encryption";

class RoomService {
  async onBoarding(ipAddress: string) {
    const roomData = await roomRepository.onBoarding(ipAddress);

    let decryptedContent: string | null = null;

    // ✅ Safe check before decrypting
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
}

export default new RoomService();