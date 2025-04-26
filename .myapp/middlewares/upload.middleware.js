'use strict'
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod }
   }
Object.defineProperty(exports, '__esModule', { value: true })
exports.upload = void 0
const multer_1 = __importDefault(require('multer'))
const path_1 = __importDefault(require('path'))
const fs_1 = __importDefault(require('fs'))
// Pastikan direktori sudah ada
const uploadDir = path_1.default.join(__dirname, '../../public/images')
if (!fs_1.default.existsSync(uploadDir)) {
   fs_1.default.mkdirSync(uploadDir, { recursive: true })
}
const storage = multer_1.default.diskStorage({
   destination: (_req, _file, cb) => {
      cb(null, uploadDir)
   },
   filename: (_req, file, cb) => {
      cb(null, file.originalname)
   }
})
exports.upload = (0, multer_1.default)({ storage })
// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../../public/images/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage });
// export { upload };
//# sourceMappingURL=upload.middleware.js.map
