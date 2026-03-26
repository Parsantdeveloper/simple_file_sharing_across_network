
import prisma from "../../config/prisma";

class roomRepository {

  async onBoarding(ipAddress: string) {

    let existingRoomIp = await prisma.roomIP.findFirst({
      where: {
        ipAddress: ipAddress
      },
      include: {
        room: {
          include: {
            textContent: true,
            roomIPs: true
          },
        },

      }
    })
    if (existingRoomIp) {
      return existingRoomIp.room;
    }

    const room = await prisma.$transaction(async (prisma) => {
      let room = await prisma.room.create({
        data: {},
        include: {
          textContent: true,
          roomIPs: true
        }


      });

      await prisma.roomIP.create({
        data: {
          ipAddress,
          roomId: room.id
        }
      })
      return room;

    })
    return room;
  }

  async updatePassword(roomId: string, hashedPassword: string) {
    return await prisma.room.update({
      where: {
        id: roomId
      },
      data: {
        passwordHash: hashedPassword
      }
    })

  }

   async deleteRoom(roomId:string){
      return await prisma.room.delete({
        where:{
          id:roomId
        }
      })
   }

}




export default new roomRepository();