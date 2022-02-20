import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  host: process.env.MONGO_HOST || '127.0.0.1:27017',
  db: process.env.MONGO_DB || 'ton',
}))
