import { Sequelize } from 'sequelize'

import { User, init as usersInit } from './users.model'
import { Message, init as messagesInit } from './messages.model'

export function initModels (sequelize: Sequelize): void {
  usersInit(sequelize)
  messagesInit(sequelize)
}
export {
  User,
  Message
}
