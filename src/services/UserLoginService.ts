import * as bcrypt from "bcryptjs";
import { Response } from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";


interface IUserRequest {
    email: string;
    password: string;
}

class UserLoginService {


    async execute({ email, password }: IUserRequest, res: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepositories);

            console.log(email)
            console.log(password)

            if (password.trim() === '') {
                return res.status(400).json({
                    message: "Digite uma senha"
                })
            }

            const userAccountExists = await usersRepository.findOne({
                email: email
            })

            const passwordAuthetication = await bcrypt.compare(password, userAccountExists.password)


            if (!passwordAuthetication) {
                return res.status(403).json({
                    message: "Senha incorreta. Tente novamente ou clique em 'Esqueceu a senha?' para redefini-la."
                })
            }

            return res.status(200).json(userAccountExists);


        } catch (error) {
            return res.status(500).json({
                message: error.message, stack: error.stack
            })
        }
    }
}

export { UserLoginService }