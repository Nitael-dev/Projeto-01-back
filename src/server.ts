import { router } from "./routes";

const express = require('express');
const app = express();

app.set("view engine", "ejs")

app.use(router)

app.listen(3000, () => console.log("mec"))