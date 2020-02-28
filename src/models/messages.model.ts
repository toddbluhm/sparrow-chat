import { Sequelize, Model, DataTypes } from 'sequelize'

const MODEL_NAME = 'messages'

export class Message extends Model {
  public id!: number;
  public userId!: number;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function init (sequelize: Sequelize): void {
  Message.init({
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
    }
  }, {
    sequelize,
    modelName: MODEL_NAME
  })
}
