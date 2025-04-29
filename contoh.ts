import vars from './src/config/vars'
import jwt from 'jsonwebtoken'
const payload = {
   userId: '1234',
   username: 'user_example',
   email: 'user@example.com'
}
const JWT_SECRET = vars.JWT_SECRET as string
const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
console.log(accessToken)
try {
   const decodedPayload = jwt.verify(accessToken, JWT_SECRET)
   console.log(decodedPayload)
} catch (err) {
   console.log('Token invalid', err)
}

