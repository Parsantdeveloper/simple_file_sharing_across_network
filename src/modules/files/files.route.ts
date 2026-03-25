
import express from "express";
import { upload } from "../../libs/files";
import {deleteFile, getFilesByRoomId, uploadFile} from "./files.controller";

 const router = express.Router();
 
/**
 * @swagger
 * tags:
 *   - name: Files
 *     description: APIs for uploading, listing, and deleting room files
 * components:
 *   schemas:
 *     FileData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 5ab2d9b0-cf7f-47c5-9c08-a2083f0398d6
 *         roomId:
 *           type: string
 *           format: uuid
 *           example: 6ea3f30a-1e43-4b8f-85b2-191f6527a840
 *         fileUrl:
 *           type: string
 *           format: uri
 *           example: https://res.cloudinary.com/demo/raw/upload/v1710000000/sample.txt
 *         fileName:
 *           type: string
 *           example: notes.txt
 *         fileType:
 *           type: string
 *           example: text/plain
 *         publicId:
 *           type: string
 *           example: ssavr/files/abc123xyz
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-03-25T09:15:32.000Z
 *     FileUploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: File uploaded
 *         data:
 *           $ref: '#/components/schemas/FileData'
 *     FileListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Files retrieved
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FileData'
 *     FileDeleteResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: File deleted
 *         data:
 *           $ref: '#/components/schemas/FileData'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Maximum 3 files per room
 */

/**
 * @swagger
 * /api/file/{roomId}:
 *   get:
 *     summary: Get files by room ID
 *     description: Returns all files uploaded for a specific room
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Room identifier
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileListResponse'
 *       404:
 *         description: No files found for this room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Invalid room ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

  router.get("/:roomId",getFilesByRoomId)

/**
 * @swagger
 * /api/file/upload:
 *   post:
 *     summary: Upload a file to a room
 *     description: Uploads a single file and associates it with the provided room ID
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - file
 *             properties:
 *               roomId:
 *                 type: string
 *                 format: uuid
 *                 example: 6ea3f30a-1e43-4b8f-85b2-191f6527a840
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileUploadResponse'
 *       400:
 *         description: Validation error or max file limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Upload failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
 
  router.post("/upload",upload.single("file"),uploadFile )

/**
 * @swagger
 * /api/file/{roomId}/{fileId}:
 *   delete:
 *     summary: Delete a file from a room
 *     description: Deletes file metadata and attempts to remove the uploaded file from cloud storage
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileDeleteResponse'
 *       403:
 *         description: File does not belong to this room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Invalid path parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

  router.delete("/:roomId/:fileId",deleteFile)



 export default router;