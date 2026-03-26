
import { Queue } from "bullmq";
import redis from "../redis";

export const roomDeleteQueue=new Queue("room-delete",{
    connection:redis,
});