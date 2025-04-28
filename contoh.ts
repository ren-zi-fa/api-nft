import bcrypt from 'bcrypt'

const data = 'renzi345akskajs'

const hashPassword = async () => {
   try {
      const res = await bcrypt.hash(data, 10)
      console.log(res) // Ini akan mencetak hasil hash setelah selesai
   } catch (error) {
      console.error(error)
   }
}

hashPassword()
