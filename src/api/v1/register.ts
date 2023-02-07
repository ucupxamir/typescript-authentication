import { Router, Request, Response } from "express";
import UserService from "../../services/UserService"

const RegisterRoute = Router();

RegisterRoute.post("/", async (req: Request, res: Response) => {
  let _userService = new UserService();

  let userData = req.body
  userData.createdBy = "sa"
  userData.updatedBy = "sa"

  let response = await _userService.userRegister({ UserData: userData })
  res.send(response)
})

export default RegisterRoute