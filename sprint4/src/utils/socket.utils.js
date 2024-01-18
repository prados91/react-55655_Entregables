import { socketServer } from "../../server.js";
import products from "../data/fs/products.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";
import users from "../data/fs/users.fs.js";
import propsUsersUtils from "./propsUsers.utils.js";
import orders from "../data/fs/orders.fs.js";
import propsOrdersUtils from "./propsOrders.utils.js";

export default async (socket) => {
    console.log("client " + socket.id + " connected");
    socket.emit("products", await products.readProducts());
    socket.on("newProduct", async (data) => {
        try {
            propsProductsUtils(data);
            await products.createProduct(data);
            socketServer.emit("products", products.readProducts());
        } catch (error) {
            console.log(error);
            socketServer.emit("alert", error.message);
        }
    });
};
