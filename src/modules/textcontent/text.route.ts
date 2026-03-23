import express from "express";
import { upsertTextContentController } from "./text.controller";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Text Content
 *     description: APIs for creating/updating encrypted text content by room
 * components:
 *   schemas:
 *     TextContentUpsertRequest:
 *       type: object
 *       required:
 *         - roomId
 *         - content
 *       properties:
 *         roomId:
 *           type: string
 *           description: Unique room identifier
 *           example: "f8d03e67-2a66-4fc6-a09a-1d3155fdbf0d"
 *         content:
 *           type: string
 *           description: Plain text content to encrypt and save
 *           example: "This is a secure note"
 *     TextContentUpsertData:
 *       type: object
 *       properties:
 *         roomId:
 *           type: string
 *           example: "f8d03e67-2a66-4fc6-a09a-1d3155fdbf0d"
 *         content:
 *           type: string
 *           description: Encrypted text content stored in database
 *           example: "U2FsdGVkX1+f2Y..."
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-23T06:00:00.000Z"
 *     TextContentUpsertResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Text content upserted successfully
 *         data:
 *           $ref: '#/components/schemas/TextContentUpsertData'
 *         meta:
 *           type: object
 *           additionalProperties: true
 * /api/text-content:
 *   put:
 *     summary: Upsert text content for a room
 *     description: Creates or updates text content for the given room ID
 *     tags: [Text Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextContentUpsertRequest'
 *     responses:
 *       200:
 *         description: Text content created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextContentUpsertResponse'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Failed to upsert text content
 */

router.put("/", upsertTextContentController);


export default router;