import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {
    async handle(req: Request, res: Response) {

        const newUser = req.body;

        const createUserService = new CreateUserService();

        const passwordTryUser = await createUserService.execute(newUser, res);

        const { password,  ...rest} = passwordTryUser;

        return rest;
    }
}

export { CreateUserController }