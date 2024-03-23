import env from "./src/utils/env.utils.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import cors from "cors";

import socketUtils from "./src/utils/socket.utils.js";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";

//Server
const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
    console.log("Server ready on port " + PORT);
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

//Views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//MIDDLEWARES
server.use(cookieParser(env.SECRET_KEY));
server.use(
    cors({
        origin: true,
        credentials: true,
    })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };
