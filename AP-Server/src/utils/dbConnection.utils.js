import { connect } from "mongoose";
import env from "./env.utils.js";
import winston_log from "../utils/logger/index.js";

const dbConnection = async () => {
    try {
        await connect(env.DB_LINK);
        winston_log.INFO("Successful connection to the MONGO database.");
    } catch (error) {
        winston_log.ERROR(error);
    }
};

export default dbConnection;
