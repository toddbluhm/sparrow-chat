import { Application } from './declarations'
import { Sequelize } from 'sequelize'

export function initSequelize (app: Application): Sequelize {
  const config = app.get('postgres')
  return new Sequelize({
    ...config,
    dialect: 'postgres'
  })
}
