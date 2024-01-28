import { Router } from "express";

import productsRouter from "./products.views.js";
import ordersRouter from "./orders.views.js";
import usersRouter from "./users.views.js";
import formsRouter from "./forms.views.js";

/*import orders from "../../data/fs/orders.fs.js";
import products from "../../data/fs/products.fs.js";
import users from "../../data/fs/users.fs.js";*/

import { orders, products, users } from "../../data/mongo/manager.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
    try {
        const all = await products.read({});
        return res.render("index", { products: all, title: "Welcome to Basketball | Store" });
    } catch (error) {
        next(error);
    }
});
viewsRouter.use("/real", productsRouter);
viewsRouter.use("/form", formsRouter);
viewsRouter.use("/register", usersRouter);
viewsRouter.use("/orders", ordersRouter);

export default viewsRouter;
