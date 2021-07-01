import { Request, Response} from "express"
import { UserLoginService } from "../services/UserLoginService"


class UserLoginController {

    async handle(req: Request, res: Response) {

        const { email, password } = req.body;

        const userLoginService = new UserLoginService();

        const login = await userLoginService.execute({ email, password }, res);

        return login;
    }
}

export { UserLoginController }