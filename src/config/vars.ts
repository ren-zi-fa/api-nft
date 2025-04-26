import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Gantikan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

// Export config
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};
