import * as _userRepository from '../repositories/UserRepository';

import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import {
    GetUserRequest,
    GetUserResponse,
    IUserService,
    UserLoginRequest,
    UserLoginResponse,
    UserRegisterRequest,
    UserRegisterResponse
} from './contract/IUserService';

import sequelize from './../configs/db';
import { Transaction } from 'sequelize';

export default class UserService implements IUserService {

    async GetUser(request: GetUserRequest): Promise<GetUserResponse> {
        let response = new GetUserResponse;

        try {
            response.data = await _userRepository.get({ where: { ...request.userData }})
        } catch (error) {
            response.status = "error"
            if (error instanceof Error) {
                response.message = error.message
            } else {
                console.log(error);
                response.message = "Terjadi kesalahan pada sistem"
            }
        }

        return response
    }

    async userRegister(request: UserRegisterRequest): Promise<UserRegisterResponse> {
        let response = new UserRegisterResponse();
        let t: Transaction = await sequelize.transaction();

        try {
            let salt = bcrypt.genSaltSync(10);
            request.UserData.password = bcrypt.hashSync(request.UserData.password, salt);

            await _userRepository.create(request.UserData, { transaction: t});

            await t.commit();
        } catch (error) {
            response.status = "error";
            if (error instanceof Error) {
                response.message = error.message
            } else {
                console.log(error);
                response.message = "Terjadi kesalahan pada sistem";
            }
            await t.rollback();
        }
        return response;
    }

    async userLogin(request: UserLoginRequest): Promise<UserLoginResponse> {
        let response = new UserLoginResponse;

        try {
            if (request.authHeader === undefined) throw new Error('Invalid Request');

            const authHeaders = request.authHeader?.split(" ");
            const authData = Buffer.from(authHeaders[1], "base64").toString("ascii").split(":")

            let user = {
                username: authData[0],
                password: authData[1]
            }

            let userData = await _userRepository.getByUsername(user.username);

            let isValid = bcrypt.compareSync(user.password, userData.password);
            if (!isValid) throw new Error("Password salah");

            response.data = userData;
            response.token = jsonwebtoken.sign({ username: userData.username}, "LOGINKEY", { noTimestamp: true });
            
        } catch (error) {
            response.status = 'error';
            if (error instanceof Error) {
                response.message = error.message
            } else {
                console.log(error);
                response.message = "Terjadi kesalahan pada sistem"
            }
        }
        return response;
    }
    
}