// middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { Prisma } from "../generated/prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log all errors (use proper logger in production)
  console.error("Error:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // 1. Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.flatten().fieldErrors,
    });
  }

  // 2. Multer file upload errors
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the 5MB limit",
      });
    }
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`,
    });
  }

  // 3. Prisma database errors (if not caught in service)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(err, res);
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      success: false,
      message: "Invalid data provided",
    });
  }

  // 4. Known operational errors (AppError and subclasses)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // 5. Unknown errors (log more details in development)
  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message || "Internal Server Error",
  });
};

function handlePrismaError(
  err: Prisma.PrismaClientKnownRequestError,
  res: Response
) {
  switch (err.code) {
    case "P2002": // Unique constraint violation
      return res.status(409).json({
        success: false,
        message: "A record with this value already exists",
        field: err.meta?.target,
      });

    case "P2025": // Record not found
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });

    case "P2003": // Foreign key constraint failed
      return res.status(400).json({
        success: false,
        message: "Invalid reference to related record",
      });

    case "P2014": // Relation violation
      return res.status(400).json({
        success: false,
        message: "Cannot delete record due to existing relations",
      });

    default:
      return res.status(500).json({
        success: false,
        message: "Database operation failed",
      });
  }
}