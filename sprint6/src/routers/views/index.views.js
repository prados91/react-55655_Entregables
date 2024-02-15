import { Router } from "express";

import { orders, products, users } from "../../data/mongo/manager.mongo.js";
import productsRouter from "./products.views.js";
import ordersRouter from "./orders.views.js";
import usersRouter from "./users.views.js";
import formsRouter from "./forms.views.js";
import sessionsRouter from "./sessions.view.js"


const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
    try {
        const all = await products.read({});
        return res.render("index", { products: all.docs, title: "Welcome to Basketball | Store" });
    } catch (error) {
        next(error);
    }
});
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/form", formsRouter);
viewsRouter.use("/register", usersRouter);
viewsRouter.use("/orders", ordersRouter);
viewsRouter.use("/auth", sessionsRouter)

export default viewsRouter;
