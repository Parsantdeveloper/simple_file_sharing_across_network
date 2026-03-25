
 import {Worker} from "bullmq";
 import redis from "../libs/redis";
 import filesRepository from "../modules/files/files.repository";
 import { destroy } from "../libs/files";
 import { AppError } from "../utils/AppError";


 const worker = new Worker(
    "file-delete",
    async job=>{
        const {fileId,publicId}=job.data as {fileId:string, publicId:string};
        try {
            await filesRepository.deleteFile(fileId);
           if (publicId) {
               await destroy(publicId);
              console.log("File deleted:", fileId);

      }

        } catch (error) {
            throw new AppError("Failed to delete file", 500);
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
