import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Configure Cloudinary storage for any file type
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "files",                 // Store all files in "files" folder
      resource_type: "auto",           // Automatically detect file type
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,        // 5 MB per file
  },
  fileFilter: (req, file, cb) => {
    // Optional: you can filter by allowed file types
    // const allowedTypes = ['image/*', 'video/*', 'text/*', 'application/pdf', 'application/zip'];
    // if (allowedTypes.some(type => file.mimetype.includes(type))) cb(null, true);
    // else cb(new Error("File type not allowed"));
    
    cb(null, true); // accept any file type
  },
});