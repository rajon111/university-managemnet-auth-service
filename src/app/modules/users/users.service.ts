import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

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
    throw new Error('Could not create users!')
  }
  return createdUsers
}

export default {
  createUser,
}
