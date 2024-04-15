import { connect } from "mongoose";
import env from "./env.utils.js";

const dbConnection = async () => {
  try {
    await connect(env.DB_LINK);
    console.log("Successful connection to the database.");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
