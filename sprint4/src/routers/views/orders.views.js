import { Router } from "express";
import orders from "../../data/fs/orders.fs.js";

const ordersRouter = Router();

ordersRouter.get("/", async (req, res, next) => {
    try {
        const all = await orders.readOrders();
        return res.render("orders", { orders: all, title: "orders" });
    } catch (error) {
        next(error);
    }
});
ordersRouter.get("/new", (req, res, next) => {
    try {
        return res.render("new", { title: "NEW" });
    } catch (error) {
        next(error);
    }
});

export default ordersRouter;
