
# SSAVR Backend

Backend API for temporary local-network style file and text sharing by room.

This service provides:
- Room onboarding by IP
- Encrypted text content storage per room
- File upload/list/delete per room
- Auto-cleanup for uploaded files using BullMQ + Redis worker
- Swagger API docs

## Tech Stack

- Node.js + TypeScript
- Express 5
- Prisma + PostgreSQL
- Redis (Upstash compatible) + BullMQ
- Cloudinary (file storage)
- Zod (validation)

## Project Structure

```text
src/
	app.ts                    # Express app + middlewares + route mounting
	server.ts                 # HTTP server entrypoint
	config/
		env.ts                  # Environment validation
		prisma.ts               # Prisma client setup
		swagger.ts              # Swagger/OpenAPI config
	modules/
		rooms/                  # Room onboarding flow
		textcontent/            # Encrypted text content endpoints
		files/                  # File upload, listing, deletion
	libs/
		encryption.ts           # AES-256-GCM text encryption/decryption
		redis.ts                # Redis client
		queues/file.queue.ts    # BullMQ queue for delayed file deletion
	workers/
		file.workers.ts         # BullMQ worker for queued deletion jobs
	prisma/
		schema.prisma
```

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL database
- Redis instance
- Cloudinary account

## Environment Variables

Create a `.env` file in the project root.

```env
# Runtime
NODE_ENV=development
PORT=4000

# Frontend/API URLs
FRONTEND_BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:4000

# Database + Redis
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
UPSTASH_REDIS_URL=redis://default:PASSWORD@HOST:PORT

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 32-byte key in hex (64 hex chars) used by AES-256-GCM
CONTENT_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

Notes:
- `CONTENT_ENCRYPTION_KEY` must represent 32 bytes (64 hex characters).
- The app currently validates `NODE_ENV`, `PORT`, `DATABASE_URL`, and `UPSTASH_REDIS_URL` at startup.

## Installation

```bash
npm install
```

## Database Setup

Run Prisma migrations:

```bash
npm run prisma:migrate
```

Generate Prisma client artifacts (also runs automatically on `npm install` via `postinstall`):

```bash
npm run prisma:generate
```

## Run the Project

### 1) Start API server (development)

```bash
npm run dev
```

### 2) Start worker (development)

In a separate terminal:

```bash
npm run dev:worker
```

The worker is required for delayed file deletion jobs.

## Production Build

```bash
npm run build
npm run start
```

If you run queue-based deletion in production, also start:

```bash
npm run start:worker
```

## Available Scripts

- `npm run dev` - Start API server in watch mode
- `npm run dev:worker` - Start queue worker in watch mode
- `npm run build` - Generate Prisma client and compile TypeScript
- `npm run start` - Run compiled API server
- `npm run start:worker` - Run compiled worker
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run Prisma migrate dev

## API Documentation

Swagger UI is available at:

- `GET /docs`

Default local URL:

- `http://localhost:4000/docs`

## Main API Endpoints

### Rooms

- `POST /api/room/onboarding`
	- Creates or fetches room data based on IP address.

### Text Content

- `PUT /api/text-content`
	- Upserts encrypted text content for a room.

### Files

- `POST /api/file/upload`
	- Uploads one file for a room (`multipart/form-data` with `roomId` and `file`).
- `GET /api/file/:roomId`
	- Returns files for a room.
- `DELETE /api/file/:roomId/:fileId`
	- Deletes one file and cancels its scheduled deletion job.

## Queue and File Cleanup

- New uploads are enqueued for delayed cleanup via BullMQ (`file-delete` queue).
- Worker logic is implemented in `src/workers/file.workers.ts`.
- File metadata is removed from DB and Cloudinary resources are deleted using `publicId`.

## Notes

- Per-room file upload limit is enforced in service logic (max 3 files).
- Text content is encrypted with AES-256-GCM before persistence.

## License

ISC


