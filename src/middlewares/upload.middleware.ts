import multer from "multer";
import path from "path";
import fs from "fs";

// Pastikan direktori sudah ada
const uploadDir = path.join(__dirname, "../../public/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname); 
  },
});

export const upload = multer({ storage });


