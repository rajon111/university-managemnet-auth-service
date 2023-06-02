import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorLogger, logger } from './shared/logger'

async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connection established')

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Database connection error', error)
  }
}

connectDB()
