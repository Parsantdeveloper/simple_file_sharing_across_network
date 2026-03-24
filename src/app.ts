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
// import { deleteTempImage } from "./modules/uploads/uploads.controller";

dotenv.config();
export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);


app.use(helmet());
app.use(morgan("dev")); 
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/room", roomRoute);
app.use("/api/text-content", textRoute);

app.use(errorHandler);