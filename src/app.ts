import { app } from './config/express'
import config from './config/vars'

app.listen(config.port, () => {
   console.log(
      `APP is running on http://localhost:${config.port} in ${config.env}`
   )
})

export default app
