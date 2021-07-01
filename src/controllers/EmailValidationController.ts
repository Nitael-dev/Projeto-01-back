import { Request, Response} from "express"
import { EmailValidation } from "../services/EmailValidation"


class EmailValidationController {

    async handle(req: Request, res: Response) {

        const { email } = req.body;

        const emailAuthentication = new EmailValidation();

        const login = await emailAuthentication.execute({ email }, res);

        return login;
    }
}

export { EmailValidationController }