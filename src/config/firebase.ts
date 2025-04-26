import admin from 'firebase-admin'
import firebaseConfig from './vars'

let app: admin.app.App

if (!admin.apps.length) {
   if (!firebaseConfig.FIREBASE_SERVICE_ACCOUNT) {
      throw new Error(
         'FIREBASE_SERVICE_ACCOUNT is not defined in the configuration.'
      )
   }

   try {
      const parsedServiceAccount = JSON.parse(
         firebaseConfig.FIREBASE_SERVICE_ACCOUNT
      )

      if (parsedServiceAccount.private_key) {
         parsedServiceAccount.private_key =
            parsedServiceAccount.private_key.replace(/\\n/g, '\n')
      }

      app = admin.initializeApp({
         credential: admin.credential.cert(parsedServiceAccount)
      })
   } catch (error) {
      if (error instanceof Error) {
         console.error('Failed to initialize Firebase Admin:', error.message)
      } else {
         console.error('Unknown error during Firebase Admin initialization')
      }
      throw error
   }
} else {
   app = admin.app()
}

export const db = admin.firestore(app)
