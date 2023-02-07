import { CreateOptions, FindOptions } from "sequelize";
import { User, UserData } from '../models/User';

export const create = async (payload: UserData, options?: CreateOptions): Promise<UserData> => {
    const user = await User.create(payload, options);
    return user;
}

export const getByPk = async (pk: string): Promise<UserData> => {
    const user = await User.findByPk(pk);
    if (!user) throw new Error('User tidak ditemukan.');
    return user;
}

export const getByUsername = async (username: string): Promise<UserData> => {
    const user = await User.findOne({ where: {
        username: username
    }});
    if (!user) throw new Error('User tidak ditemukan.');
    return user;
}

export const get = async (params: FindOptions): Promise<UserData[]> => {
    const users = await User.findAll(params);
    return users;
}