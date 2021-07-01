import { Response } from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";


interface IUserRequest {
    email: string;
}

class EmailAuthentication {


    async execute({ email }: IUserRequest, res: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepositories);

            var userMail = email.toLocaleLowerCase().replace(/[&\!/\\#,+ ()$~%'":*?<>{}]/g, '')

            if (email.trim() === '') {
                return res.status(400).json({
                    message: 'Digite um e-mail'
                })
            }
            const userAccountExists = await usersRepository.findOne({
                email: email
            })
            if (!userAccountExists) {
                return res.status(404).json({
                    message: "Não foi possível encontrar sua Conta do Google"
                })
            }
            return res.json()

        } catch (error) {
            return res.status(500).json({
                message: error.message, stack: error.stack
            })
        }
    }
}

export { EmailAuthentication }