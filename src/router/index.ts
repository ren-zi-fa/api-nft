import express from 'express'
import { upload } from '../middlewares/upload.middleware'

const router = express.Router()

router.post('/create-person', upload.single('photo'), (req, res) => {
   const { nama, umur, alamat } = req.body
   const fotoPath = req.file ? `/images/${req.file.filename}` : null

   res.send({
      message: 'Data received',
      data: { nama, umur, alamat, foto: fotoPath }
   })
})

router.get('/hello/:nama', (req, res) => {
   const nama = req.params.nama
   res.send({ message: `hallo ${nama}` })
})

export { router }
