import { Router } from "express";
import orders from "../../data/fs/orders.fs.js";
import propsOrders from "../../middlewares/propsOrders.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await orders.createOrder(data);
        return res.json({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.get("/", async (req, res, next) => {
    try {
        const all = await orders.readOrders();
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const all = await orders.readOrdersByUser(uid);
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.put("/:oid", async (req, res, next) => {
    try {
        const { oid } = req.params;
        const { quantity, state } = req.body;
        const response = await orders.updateOrder(oid, quantity, state);
        if (response) {
            return res.json({
                statusCode: 200,
                response: "The order " + response + " was updated.",
            });
        }
    } catch (error) {
        return next(error);
    }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
    try {
        const { oid } = req.params;
        const response = await orders.removeOrders(oid);
        return res.json({
            statusCode: 200,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;
