import app from '../src/app'
import { Sequelize } from 'sequelize'

const config = app.get('postgres')
const seq = new Sequelize({
  ...config,
  database: 'postgres',
  dialect: 'postgres'
})

async function run (): Promise<void> {
  if (process.env.CI == null) {
    await seq.getQueryInterface().dropDatabase(config.database)
    await seq.getQueryInterface().createDatabase(config.database)
  }
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
