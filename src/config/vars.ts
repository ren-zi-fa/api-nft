import path from 'path'
import dotenv from 'dotenv'

// Gantikan __dirname
dotenv.config({ path: path.resolve(__dirname, '../../.env.development') })

// Export config
export default {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT,
   JWT_SECRET: process.env.JWT_SECRET
}
