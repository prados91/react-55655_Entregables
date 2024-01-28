import { Router } from "express";
//import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import propsOrders from "../../middlewares/propsOrders.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await orders.create(data);
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
        const all = await orders.read({});
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
        const all = await orders.readOne(uid);
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
        const response = await orders.update(oid, quantity, state);
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
        const response = await orders.destroy(oid);
        return res.json({
            statusCode: 200,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;
