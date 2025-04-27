import path from 'path'
import express from 'express'
import { router } from '../router'

const app = express()

app.use('/images', express.static(path.join(__dirname, '../public/images')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('/public'))

app.get('/', (req, res) => {
   res.json({ message: 'api is ok' })
})
app.use('/api', router)

export { app }
