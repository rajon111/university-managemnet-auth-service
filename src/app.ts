import express, { Application } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.router'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', usersRouter)

// testing
// app.get('/', async (req: Request, res: Response, next:NextFunction) => {
//   throw new ApiError(400,'some error')
//   // res.send('Working Successfully!')
// })

// global errors handler
app.use(globalErrorHandler)

export default app
