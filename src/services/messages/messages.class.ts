import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../declarations'

export interface MessagesData {
  id?: number
  userId: number
  text: string
  createdAt: Date
}

export class Messages extends Service<MessagesData> {
  constructor (options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
  }
}
