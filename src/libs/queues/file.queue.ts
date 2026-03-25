
import { Queue } from "bullmq";
import redis from "../redis";

export const fileDeleteQueue=new Queue("file-delete",{
    connection:redis,
});