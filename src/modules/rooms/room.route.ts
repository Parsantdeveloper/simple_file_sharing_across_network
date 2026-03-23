import express from "express";
import { onBoardingController } from "./room.controller";

const router=express.Router();

/**
 * @swagger
 * /api/room/onboarding:
 *   post:
 *     summary: Create onboarding room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ipAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room created successfully
 */
router.post("/onboarding",onBoardingController);



export default router;