import { Router } from "express";
//import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await products.create(data);
        return res.json({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

productsRouter.get("/", async (req, res, next) => {
    try {
        const filter = {};
        const order = {
            stock: 1,
        };

        if (req.query.title) {
            filter.title = req.query.title;
        }

        if (req.query.stock === "desc") {
            order.stock = -1;
        }
        const all = await products.read({ filter, order });
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
    }
});

productsRouter.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
});

productsRouter.put("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const data = req.body;
        const response = await products.update(pid, data);
        if (response) {
            return res.json({
                statusCode: 200,
                response: "The product " + response + " was updated.",
            });
        }
    } catch (error) {
        return next(error);
    }
});

productsRouter.delete("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const response = await products.destroy(pid);
        return res.json({
            statusCode: 200,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

export default productsRouter;
