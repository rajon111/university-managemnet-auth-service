import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //  AUTO GENERATED INCRIMENTAL ID
  const id = await generateUserId()
  user.id = id

  // DEFAULT PASSWORD
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUsers = await User.create(user)

  if (!createdUsers) {
    throw new ApiError(400, 'Could not create users!')
  }
  return createdUsers
}

export const UserService = {
  createUser,
}
