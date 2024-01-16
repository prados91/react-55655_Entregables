import { Router } from "express";

import ordersRouter from "./orders.views.js";
import productsRouter from "./products.views.js";
import usersRouter from "./users.views.js";

import orders from "../../data/fs/orders.fs.js";
import products from "../../data/fs/products.fs.js";
import users from "../../data/fs/users.fs.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
    try {
        const all = products.readProducts();
        return res.render("index", { products: all, title: "HOME" });
    } catch (error) {
        next(error);
    }
});
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/orders", ordersRouter);

export default viewsRouter;
