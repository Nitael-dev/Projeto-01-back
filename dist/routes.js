"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var CreateUserController_1 = require("./controllers/CreateUserController");
var UserLoginController_1 = require("./controllers/UserLoginController");
var EmailAuthenticationController_1 = require("./controllers/EmailAuthenticationController");
var EmailValidationController_1 = require("./controllers/EmailValidationController");
var createUserController = new CreateUserController_1.CreateUserController();
var userLoginController = new UserLoginController_1.UserLoginController();
var emailAuthenticationController = new EmailAuthenticationController_1.EmailAuthenticationController();
var emailValidationController = new EmailValidationController_1.EmailValidationController();
var express = require('express');
var app = express();
var router = express_1.Router();
exports.router = router;
app.set("view engine", "ejs");
var dir = "/home/okaydev/Área de Trabalho/projetots/Projeto-1/src";
router.get("/signin", function (req, res) {
    res.render("/mail");
});
router.get("/signup", function (req, res) {
    res.render(dir + "/pages/signup");
});
router.post("/SignIn", userLoginController.handle);
router.post("/SignUp", createUserController.handle);
router.post("/MailAuth", emailAuthenticationController.handle);
router.post('/MailValidation', emailValidationController.handle);
