import { DataTypes, Model, UUID, UUIDV4 } from "sequelize";
import conn from "../configs/db";

export interface UserData {
    id: string,
    username: string,
    password: string,
    createdBy?: string,
    createdAt: Date,
    updatedBy?: string,
    updatedAt: Date
}

export class User extends Model<UserData> implements UserData {
    public id!: string
    public username!: string
    public password!: string

    public readonly createdBy!: string
    public readonly createdAt!: Date
    public readonly updatedBy!: string
    public readonly updatedAt!: Date
}

User.init({
    id: {
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
}, {
    sequelize: conn,
    tableName: 'm_users'
})