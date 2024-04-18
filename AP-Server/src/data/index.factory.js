import argsUtil from "../utils/args.utils.js";
import dbConnection from "../utils/dbConnection.utils.js";
import winstonLog from "../utils/logger/index.js";

const environment = argsUtil.env;

let dao = {};

switch (environment) {
    case "test":
        winstonLog.INFO("MEMORY CONNECTED");
        const { default: productsMemory } = await import("./memory/products.memory.js");
        dao = { products: productsMemory };
        break;
    case "dev": //aqui iría dev para que se use FileSystem en modo desarrollo
        winstonLog.INFO("FS CONNECTED");
        const { default: productsFs } = await import("./fs/products.fs.js");
        const { default: usersFs } = await import("./fs/users.fs.js");
        const { default: ordersFs } = await import("./fs/orders.fs.js");
        const { default: commentsFs } = await import("./fs/comments.fs.js");
        dao = { products: productsFs, users: usersFs, orders: ordersFs, comments: commentsFs };
        break;

    default: // para modo producción se usaría MONGO
        dbConnection();
        const { default: productsMongo } = await import("./mongo/products.mongo.js");
        const { default: usersMongo } = await import("./mongo/users.mongo.js");
        const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
        const { default: commentsMongo } = await import("./mongo/comments.mongo.js");
        dao = { products: productsMongo, users: usersMongo, orders: ordersMongo, comments: commentsMongo };
        break;
}

export default dao;
