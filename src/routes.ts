import { Router } from "express";
import { CreateUserController} from "./controllers/CreateUserController"
import { UserLoginController } from "./controllers/UserLoginController";
import { EmailAuthenticationController } from "./controllers/EmailAuthenticationController"
import { EmailValidationController } from "./controllers/EmailValidationController";

const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const emailAuthenticationController = new EmailAuthenticationController();
const emailValidationController = new EmailValidationController();


const express = require('express');
const app = express()
const router = Router();

app.set("view engine", "ejs")

const dir = "/home/okaydev/Área de Trabalho/projetots/Projeto-1/src"

router.get("/signin", function (req, res) {
    res.render("/mail") 
})
router.get("/signup", function (req, res) {
        res.render(dir + "/pages/signup")
})
router.post("/SignIn", userLoginController.handle)
router.post("/SignUp", createUserController.handle)
router.post("/MailAuth", emailAuthenticationController.handle)
router.post('/MailValidation', emailValidationController.handle)

export { router };