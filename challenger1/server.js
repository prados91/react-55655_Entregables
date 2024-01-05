import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

const server = express();

const PORT = 8080;
const ready = console.log("Server ready on port " + PORT);
server.listen(PORT, ready);

//TEMPLATES
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "./src/views");

//MIDDLEWARES
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
