import { Router } from "express";

const express = require('express');
const app = express()
const router = Router();

app.set("view engine", "ejs")

const dir = "/home/okaydev/Área de Trabalho/projetots/Projeto-1/src"

router.get("/", function (req, res) {
    res.render(dir + "/pages/index") 
})
router.get("/signup", function (req, res) {
    res.render(dir + "/pages/signup")
})

export { router };