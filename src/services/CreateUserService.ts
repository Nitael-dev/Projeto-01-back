import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories"
import { hash } from "bcryptjs"
import { Response } from 'express';

interface IUserRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
}

interface IUserResponse {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

class CreateUserService {

    async execute({ firstname, lastname, email, password, confirmpassword }: IUserRequest, res: Response): Promise<IUserResponse | any> {
        try {
            const usersRepository = getCustomRepository(UsersRepositories);

            const invalidFirstName = firstname.replace(/[&\!@/ #,+()$~%.'":*?<>{}]/g, '')

            const invalidLastName = lastname.replace(/[&\!@/# ,+()$~%.'":*?<>{}]/g, '')

            
            if (firstname !== invalidFirstName || lastname !== invalidLastName) {
                return res.status(400).json({
                message: 'Tem certeza de que inseriu seu nome corretamente?'
            })
            }
            // Names
            if (firstname.trim() === '' && lastname.trim() === '') {
                return res.status(400).json({
                    message: "Digite o nome e o sobrenome"
                });
            }
            if (lastname.trim() === '') {
                return res.status(400).json({
                    message: "Digite o sobrenome"
                });
            }
            
            if (firstname.trim() === '') {
                return res.status(400).json({
                    message: 'Digite o nome'
                });
            }

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
            if(password.trim() === '') {
                return res.status(400).json({
                    message: 'Digite uma senha'
                });
            }

            if(password.length < 6 || password.length > 18) {
                return res.status(400).json({
                    message: "Sua senha deve ter entre 6 e 18 caracteres"
                });
            }
            
            if (confirmpassword.trim() === '') {
                return res.status(400).json({
                    message: 'Confirme sua senha'
                })
            }

            if (confirmpassword != password) {
                return res.status(400).json({
                    message: 'As senhas não são iguais. Tente novamente.'
                })
            }

            if (!userAccountExists){
                const passwordHash = await hash(password, 8);

            const user = usersRepository.create({
                firstname,
                lastname,
                email: userMail,
                password: passwordHash
            });
            
            await usersRepository.save(user);

            return res.status(201).json(user);

        }
        } catch (error) {
            console.log(error.stack)
            return res.status(500).json({message: error.message, stack: error.stack})
        }
    }
}

export { CreateUserService }