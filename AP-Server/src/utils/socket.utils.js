import { socketServer } from "../../server.js";
import products from "../data/fs/products.fs.js";
//import { products } from "../data/mongo/manager.mongo.js";
import propsProductsUtils from "./propsProducts.utils.js";
import users from "../data/fs/users.fs.js";
import propsUsersUtils from "./propsUsers.utils.js";
import orders from "../data/fs/orders.fs.js";
import propsOrdersUtils from "./propsOrders.utils.js";
import winstonLog from "../utils/logger/index.js";

export default async (socket) => {
    winstonLog.INFO("client " + socket.id + " connected");
    socket.emit("products", await products.read());
    socket.on("newProduct", async (data) => {
        try {
            propsProductsUtils(data);
            await products.createProduct(data);
            socketServer.emit("products", products.read());
        } catch (error) {
            winstonLog.ERROR(error);
            socketServer.emit("alert", error.message);
        }
    });
};
