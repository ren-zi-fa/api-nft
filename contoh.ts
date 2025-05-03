import vars from './src/config/vars'
import jwt from 'jsonwebtoken'
const payload = {
   userId: '1234',
   username: 'user_example',
   email: 'user@example.com'
}
const JWT_SECRET = vars.JWT_SECRET as string
const acces_token =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJIdGF2a3VxOFdPemoySVhzWWlNZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInRva2VuVHlwZSI6ImFjY2VzcyIsInJvbGUiOiJhdXRob3IiLCJpYXQiOjE3NDYxODgzMTYsImV4cCI6MTc0NjE4ODM3Nn0.d8z-koS_9JvJ4OKWZ9KKEkb5qLjpdj4MS5fiNDiqR6E'
try {
   const decodedPayload = jwt.verify(acces_token, JWT_SECRET)
   console.log(decodedPayload)
} catch (err) {
   console.log('Token invalid', err)
}
