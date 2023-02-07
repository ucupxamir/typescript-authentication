import { Request, Response, NextFunction } from "express";
import { BaseResponse } from "../services/contract/BaseResponse";
import jsonwebtoken from "jsonwebtoken"
import UserService from "../services/UserService";
import { UserData } from "../models/User";

export const Application = (req: Request, res: Response, next: NextFunction) => {
    let response = new BaseResponse;

    try {
        if (req.headers["content-type"] === "application/json") next();
        else throw new Error("Bad request.");
    } catch (error) {
        response.status = 'error';
        if (error instanceof Error) {
            response.message = error.message
        } else {
            console.log(error);
            response.message = 'Terjadi kesalahan pada sistem'
        }
        res.send(response)
    }
}

export const Authorization = (req: Request, res: Response, next: NextFunction) => {
    let response = new BaseResponse;

    try {
        let authHeader = req.headers.authorization?.split(" ")
        if (authHeader && authHeader[0] === "Basic") next()
        else throw new Error("Unauthorized.")
    } catch (error) {
        response.status = "error"
        if (error instanceof Error) {
            response.message = error.message
        } else {
            console.log(error)
            response.message = "Terjadi kesalahan pada sistem."
        }
        res.send(response)
    }
}

export const Api = async (req: Request, res: Response, next: NextFunction) => {
    let response = new BaseResponse;

    try {
        let authHeader = req.headers.authorization?.split(" ");

        if (authHeader && authHeader[0] === "Bearer") {
            jsonwebtoken.verify(authHeader[1], "LOGINKEY", async (err, decode) => {
                if (err) {
                    response.status = "error"
                    response.message = err.message
                } else {
                    let userService = new UserService;
                    let userData = await userService.GetUser({ userData: (<UserData>decode) })
                    res.locals.user = userData.data[0]

                    next()
                }
            })
        } else {
            throw new Error("Unauthorized.")
        }
    } catch (error) {
        response.status = "error"
        if (error instanceof Error) {
            response.message = error.message
        } else {
            console.log(error)
            response.message = "Terjadi kesalahan pada sistem."
        }
        res.send(response)
    }
}