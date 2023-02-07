import { Router, Request, Response } from "express";
import UserService from "../../services/UserService"

const LoginRoute = Router();

LoginRoute.post("/", async (req: Request, res: Response) => {
    let _userService = new UserService();
    
    let response = await _userService.userLogin({ authHeader: req.headers.authorization })
    res.send(response)
})

export default LoginRoute