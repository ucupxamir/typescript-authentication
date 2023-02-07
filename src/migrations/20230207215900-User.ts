import { QueryInterface, DataTypes, UUIDV4, UUID } from "sequelize";

const tableName = "m_users";

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable(tableName, {
      id:{
        allowNull: false,
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
      },
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedBy: {
        allowNull: false,
        type: DataTypes.STRING
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable(tableName)
  }
};