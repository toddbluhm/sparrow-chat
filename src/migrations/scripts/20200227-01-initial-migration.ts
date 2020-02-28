import { DataTypes, QueryInterface } from 'sequelize'

export async function up (query: QueryInterface): Promise<void> {
  await query.sequelize.transaction(async t => {
    await query.createTable('users', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: new DataTypes.STRING(320),
        allowNull: false,
        unique: true
      },
      password: {
        type: new DataTypes.STRING(512),
        allowNull: true
      },
      avatar: {
        type: new DataTypes.STRING(512),
        allowNull: true
      },
      socialMediaConnections: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      createdAt: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, { transaction: t })
    await query.addIndex('users', ['email'], { transaction: t })
    await query.addIndex('users', ['socialMediaConnections'], { transaction: t, using: 'GIN' })

    await query.createTable('messages', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: new DataTypes.DATE(),
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, { transaction: t })
    await query.addIndex('messages', ['userId'], { transaction: t })
  })
}

export async function down (query: QueryInterface): Promise<void> {
  await query.dropTable('messages')
  await query.dropTable('users')
}
