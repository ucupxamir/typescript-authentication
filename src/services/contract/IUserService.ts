import { UserData } from '../../models/User';
import { BaseResponse } from './BaseResponse';
import { CreateOptions } from 'sequelize';

export class UserRegisterRequest {
    public UserData!: UserData
    public options?: CreateOptions
}

export class UserRegisterResponse extends BaseResponse { };

export class UserLoginRequest {
    public authHeader?: string
}

export class UserLoginResponse extends BaseResponse {
    public data!: UserData
    public token!: string
}

export class GetUserRequest {
    public userData!: UserData
}

export class GetUserResponse extends BaseResponse {
    public data!: UserData[]
}

export interface IUserService {
    userRegister(request: UserRegisterRequest): Promise<UserRegisterResponse>
    userLogin(request: UserLoginRequest): Promise<UserLoginResponse>
    GetUser(request: GetUserRequest): Promise<GetUserResponse>
}