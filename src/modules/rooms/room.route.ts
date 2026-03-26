import express from "express";
import {  onBoardingController} from "./room.controller";

const router=express.Router();

/**
 * @swagger
 * tags:
 *   - name: Rooms
 *     description: APIs for creating a room session and managing room credentials
 * components:
 *   schemas:
 *     RoomOnboardingRequest:
 *       type: object
 *       required:
 *         - ipAddress
 *       properties:
 *         ipAddress:
 *           type: string
 *           format: ipv4
 *           example: 192.168.1.10
 *     RoomOnboardingResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Room created successfully
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: 48f8d1a4-89f4-4d8c-8d89-77a64cdd9468
 *             passwordHash:
 *               type: string
 *               nullable: true
 *               example: null
 *             textContent:
 *               type: object
 *               nullable: true
 *             roomIPs:
 *               type: array
 *               items:
 *                 type: object
 *         meta:
 *           type: object
 *           additionalProperties: true
 *     RoomUpdatePasswordRequest:
 *       type: object
 *       required:
 *         - roomId
 *         - password
 *       properties:
 *         roomId:
 *           type: string
 *           format: uuid
 *           example: 48f8d1a4-89f4-4d8c-8d89-77a64cdd9468
 *         password:
 *           type: string
 *           minLength: 6
 *           example: mySecret123
 *     RoomDeleteRequest:
 *       type: object
 *       required:
 *         - roomId
 *       properties:
 *         roomId:
 *           type: string
 *           format: uuid
 *           example: 48f8d1a4-89f4-4d8c-8d89-77a64cdd9468
 *     BasicSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Operation completed successfully
 *         data:
 *           nullable: true
 *         meta:
 *           type: object
 *           additionalProperties: true
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Invalid request body
 *
 * /api/room/onboarding:
 *   post:
 *     summary: Create or fetch onboarding room
 *     description: Returns an existing room mapped to the IP address or creates a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomOnboardingRequest'
 *     responses:
 *       200:
 *         description: Room returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomOnboardingResponse'
 *       400:
 *         description: Invalid IP address format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/onboarding",onBoardingController);

 

export default router;