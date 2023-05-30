import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string)
    console.warn('database connection established')

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Database connection error', error)
  }
}

connectDB()
