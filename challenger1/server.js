import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
const server = express();

const PORT = 8080;
const ready = console.log("Server ready on port " + PORT);

//MIDDLEWARES
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

server.listen(PORT, ready);
