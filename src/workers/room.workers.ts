
 import {Worker} from "bullmq";
 import redis from "../libs/redis";
 import roomRepository from "@/modules/rooms/room.repository";
 import { AppError } from "../utils/AppError";


 const worker = new Worker(
    "room-delete",
    async job=>{
        const {roomId}=job.data as {roomId:string};
        try {
            await roomRepository.deleteRoom(roomId);

        } catch (error) {
            throw new AppError("Failed to delete room", 500);
        }
    },
    {

        connection:redis
    }

 );
  
 worker.on("completed",job=>{
    console.log(`Job ${job.id} completed successfully`);
 })

 worker.on("failed",(job,error)=>{
    console.error(`Job ${job?.id} failed with error:`, error);
 })
