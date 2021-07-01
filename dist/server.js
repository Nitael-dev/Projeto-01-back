"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("./routes");
require("express-async-errors");
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("./database");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(routes_1.router);
app.listen(process.env.PORT || 3001, function () { return console.log("mec"); });
