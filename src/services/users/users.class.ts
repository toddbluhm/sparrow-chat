import crypto from 'crypto'
import { Params } from '@feathersjs/feathers'
import { Service, NedbServiceOptions } from 'feathers-nedb'
import { GeneralError } from '@feathersjs/errors'
import { Application } from '../../declarations'

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar'
// The size query. Our chat needs 60px images
const query = 's=60'

// A type interface for our user (it does not validate any data)
export interface UserData {
  _id?: string
  email: string
  password: string
  avatar?: string
  githubId?: string
}

export class Users extends Service<UserData> {
  constructor (options: Partial<NedbServiceOptions>, app: Application) {
    super(options)
  }

  async create (data: UserData, params?: Params): Promise<UserData | UserData[]> {
    // This is the information we want from the user signup data
    const { email, password, githubId } = data
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
      githubId,
      avatar
    }

    // Call the original `create` method with existing `params` and new data
    try {
      return await super.create(userData, params)
    } catch (e) {
      if (/violates the unique constraint/gi.test(e.message)) {
        throw new GeneralError('That user already exists. Please login instead.')
      }
      throw e
    }
  }
}
