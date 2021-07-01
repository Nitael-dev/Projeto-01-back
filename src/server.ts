import { router } from "./routes";
import "express-async-errors"
import "reflect-metadata"
import  express from "express"
import "./database"
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(process.env.PORT || 3001, () => console.log("mec"))