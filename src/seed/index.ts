import { db } from '../config/firebase'
import { CollectionsModel, NFTItemModel, UserModel } from '../model'

async function seed() {
   const userId = 'USR26'
   const users: UserModel[] = [
      {
         username: 'luriks123',
         email: 'luriks@gmail.com',
         password: 'luriks',
         refresh_token: 'iudirutiNGJHJjshdsjd7346',
         role: 'author',
         avt_image:
            'https://res.cloudinary.com/dschnntvt/image/upload/v1746024124/rank-7_yvarux.webp'
      }
   ]
   const nftItems: NFTItemModel[] = [
      {
         userId: userId,
         highest_bid: 34324,
         nft_name: 'sjijs',
         nft_image:
            'https://res.cloudinary.com/dschnntvt/image/upload/v1746024218/col-img1_zv3zhu.png',
         price: 38749,
         status: 'available'
      }
   ]
   const collections: CollectionsModel[] = [
      {
         userId: userId,
         collection_image: [
            'https://res.cloudinary.com/dschnntvt/image/upload/v1746024217/img-1-1_zupyym.png',
            'https://res.cloudinary.com/dschnntvt/image/upload/v1746024219/img-3-1_ajckax.png'
         ],
         collection_name: 'Example Collection',
         total_sales: 3847
      }
   ]

   const batch = db.batch()
   const results: UserModel[] = []

   for (const user of users) {
      const docRef = db.collection('users').doc(userId)
      batch.set(docRef, user)
      results.push(user)
   }

   for (const nft of nftItems) {
      const docRef = db.collection('nft_item').doc()
      batch.set(docRef, nft)
   }

   for (const collection of collections) {
      const docRef = db.collection('collections').doc()
      batch.set(docRef, collection)
   }

   try {
      await batch.commit()
      console.log('✅ Seeding selesai!', results)
      process.exit(0)
   } catch (err) {
      console.error('❌ Gagal seeding:', err)
      process.exit(1)
   }
}

seed()
