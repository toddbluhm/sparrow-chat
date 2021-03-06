import crypto from 'crypto'
import { Params } from '@feathersjs/feathers'
import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { GeneralError } from '@feathersjs/errors'
import { Application } from '../../declarations'

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar'
// The size query. Our chat needs 60px images
const query = 's=60'

// A type interface for our user (it does not validate any data)
export interface UserData {
  id?: number
  email: string
  password: string
  avatar?: string
  socialMediaConnections?: {
    githubId?: string
    facebookId?: string
  }
}

export class Users extends Service<UserData> {
  constructor (options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
  }

  async create (data: UserData, params?: Params): Promise<UserData> {
    // This is the information we want from the user signup data
    const { email, password, socialMediaConnections } = data
    let { avatar } = data
    // If no avatar attempt to use the email to grab a gravatar
    if (avatar == null || avatar === '') {
      // Gravatar uses MD5 hashes from an email address (all lowercase) to get the image
      const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
      avatar = `${gravatarUrl}/${hash}?${query}`
    }
    // The complete user
    const userData = {
      email,
      password,
      socialMediaConnections,
      avatar
    }

    // Call the original `create` method with existing `params` and new data
    try {
      const res = await super.create(userData, params)
      if (Array.isArray(res)) {
        return res[0]
      }
      return res
    } catch (e) {
      if (/violates the unique constraint/gi.test(e.message)) {
        throw new GeneralError('That user already exists. Please login instead.')
      }
      throw e
    }
  }
}
