import { Response } from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";


interface IUserRequest {
    email: string;
}

class EmailValidation {


    async execute({ email }: IUserRequest, res: Response) {
        try {
            const usersRepository = getCustomRepository(UsersRepositories);

            let userMail = email.toLocaleLowerCase().replace(/[&\!/\\@#,+ ()$~%'":*?<>{}]/g, '')

            if (email.trim() === '') {
                return res.status(400).json({
                    message: 'Digite um e-mail'
                })
            }
            if (userMail != email) {
                return res.status(400).json({
                    message: 'Somente letras (a - z), números (0 - 9) e pontos (.) são permitidos.'
                })
            }

            if (email.length < 6 || email.length > 30) {
                return res.status(400).json({
                    message: 'Seu nome de usuário deve ter entre 6 e 30 caracteres.'
                });
            }

//
            if (email.search('gmail') != -1 || email.search('google') != -1) {
                return res.status(403).json({
                    message: 'Este nome de usuário não é permitido. Tente novamente.'
                })
            }
//
            userMail += '@gmail.com'
            const userAccountExists = await usersRepository.findOne({
                email: userMail
            })
            

            if (userAccountExists) {
                return res.status(409).json({
                    message: "Este nome de usuário já está em uso. Tente outro."
            })
        }
            if (!userAccountExists) {
                return res.status(200).json(userAccountExists);
            }
                


        } catch (error) {
            return res.status(500).json({
                message: error.message, stack: error.stack
            })
        }
    }
}

export { EmailValidation }