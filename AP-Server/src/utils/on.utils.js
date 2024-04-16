import winston_log from "../utils/logger/index.js";

process.on("exit", (code) => winston_log.INFO("el proceso terminó con código " + code));

process.on("uncaughtException", (error) => winston_log.ERROR("ha ocurrido un error: " + error.message));

winston_log.INFO(process.pid);
process.pid();
process.exit(1);
