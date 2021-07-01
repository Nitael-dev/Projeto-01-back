import { Request, Response} from "express"
import { EmailAuthentication } from "../services/EmailAuthentication"


class EmailAuthenticationController {

    async handle(req: Request, res: Response) {

        const { email } = req.body;

        const emailAuthentication = new EmailAuthentication();

        const login = await emailAuthentication.execute({ email }, res);

        return login;
    }
}

export { EmailAuthenticationController }