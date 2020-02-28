import app from '../app'
const env = process.env.NODE_ENV ?? 'development'
const dialect = 'postgres'

module.exports = {
  [env]: {
    dialect,
    ...app.get(dialect),
    migrationStorageTableName: '_migrations'
  }
}
