import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import roomRoute from "./modules/rooms/room.route";
import textRoute from "./modules/textcontent/text.route";
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import fileRoute from "./modules/files/files.route";

dotenv.config();
export const app = express();

app.use(
  cors({
    origin: [
      `${process.env.FRONTEND_BASE_URL}`,
      "https://simple-file-and-text-sharing-websit.vercel.app",
    ], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);


app.use(helmet());
app.use(morgan("dev")); 
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the File Sharing API");
})

if(process.env.NODE_ENV==="development"){
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


app.use("/api/room", roomRoute);
app.use("/api/text-content", textRoute);
app.use("/api/file", fileRoute);

app.use(errorHandler);