import path from 'path'
import express from 'express'
import { router } from '../router'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use('/images', express.static(path.join(__dirname, '../public/images')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('/public'))
const corsOptions = {
   origin: 'http://localhost:5173',
   credentials: true
}

app.use(cors(corsOptions))
app.get('/', (req, res) => {
   res.json({ message: 'api is ok' })
})
app.use('/api', router)

export { app }
