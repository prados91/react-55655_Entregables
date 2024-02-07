import { Router } from "express";
//import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import propsOrders from "../../middlewares/propsOrders.js";

const ordersRouter = Router();

//ordersRouter.post("/", propsOrders, async (req, res, next) => {
ordersRouter.post("/", async (req, res, next) => {
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
        const options = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
            sort: { quantity: 1 },
        };
        const filter = {};
        if (req.query.user_id) {
            filter.user_id = new RegExp(req.query.user_id.trim(), "i");
        }
        if (req.query.sort === "desc") {
            options.sort.quantity = -1;
        }
        const all = await orders.read({ filter, options });
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.get("/total/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const report = await orders.report(uid);
        return res.json({
            statusCode: 200,
            response: report,
        });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const filter = { user_id: uid };
        const all = await orders.read({ filter });
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
        const data = req.body;
        const response = await orders.update(oid, data);

        return res.json({
            statusCode: 200,
            response: "The order " + response + " was updated.",
        });
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
