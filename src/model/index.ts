type Status = 'available' | 'sold' | 'reserved' | 'on_auction'
type Role = 'author' | 'buyer'

interface CollectionsModel {
   userId: string
   collection_image: string[]
   total_sales: number
   collection_name: string
}

interface NFTItemModel {
   nft_name: string
   userId: string
   nft_image: string
   price: number
   status: Status
   highest_bid: number
}

interface UserModel {
   avt_image: string
   username: string
   email: string
   password: string
   refresh_token: string
   role: Role
}

interface Access_Token {
   userId: string
   username: string
   tokenType: string
   role: string
   iat: number
   exp: number
}
interface Refresh_Token {
   userId: string
   tokenType: string
   iat: number
   exp: number
}
export type {
   Refresh_Token,
   CollectionsModel,
   NFTItemModel,
   UserModel,
   Role,
   Access_Token
}
