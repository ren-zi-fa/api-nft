import { NextFunction, Request, Response } from 'express'
import { body, matchedData, validationResult } from 'express-validator/lib'
import { NFTItemModel } from '../model'
import { db } from '../config/firebase'

const addNft = async (req: Request, res: Response) => {
   try {
      const data = validationResult(req)
      if (!data.isEmpty()) {
         res.status(400).json({
            success: false,
            message: data.array()
         })
         return
      }

      const ressult = matchedData(req)
      const { highest_bid, nft_image, nft_name, price, status, userId } =
         ressult as NFTItemModel

      const docRef = await db.collection('nft_item').add({
         highest_bid,
         nft_image,
         nft_name,
         price,
         status,
         userId
      })

      if (!docRef || !docRef.id) {
         res.status(500).json({
            success: false,
            message: 'Data gagal disimpan ke database'
         })
         return
      }

      res.status(201).json({
         success: true,
         message: 'Data berhasil disimpan'
      })
     
   } catch (error: any) {
      console.error('Error saat menyimpan NFT:', error)
      res.status(500).json({
         success: false,
         message: 'Terjadi kesalahan saat menyimpan data',
         error: error.message || error.toString()
      })
      return
   }
}

export { addNft }
