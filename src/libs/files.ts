// libs/files.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import { AppError } from "@/utils/AppError";

// Configure Cloudinary storage for any file type
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "files",
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
  },
  fileFilter: (req, file, cb) => {
    cb(null, true); // accept any file type
  },
});


export const destroy = async (public_id: string) => {
     
  if (!public_id) {
    throw AppError.badRequest("Public ID is required for deletion");
  }

  try {
    
    const result = await cloudinary.uploader.destroy(public_id);

    // Cloudinary returns { result: 'ok' } on success
    // or { result: 'not found' } if file doesn't exist
    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error(`Cloudinary deletion failed: ${result.result}`);
    }

    return result;
  } catch (error) {
    throw AppError.badRequest(
      `Failed to delete file from cloud: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};