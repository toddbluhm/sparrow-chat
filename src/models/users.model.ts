import { Sequelize, Model, DataTypes } from 'sequelize'

const MODEL_NAME = 'users'

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string | null;
  public avatar!: string | null;
  public socialMediaConnections!: {
    githubId?: string
    facebookId?: string
  } | null

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function init (sequelize: Sequelize): void {
  User.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(320),
      allowNull: false
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
    }
  }, {
    sequelize,
    modelName: MODEL_NAME
  })
}
