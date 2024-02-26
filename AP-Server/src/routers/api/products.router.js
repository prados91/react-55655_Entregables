import { Router } from "express";
//import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import isStockOk from "../../utils/isStockOk.utils.js";

const productsRouter = Router();

productsRouter.post("/", passCallBackMid("jwt"), isAdmin, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await products.create(data);
        return res.json({ statusCode: 201, response });
    } catch (error) {
        return next(error);
    }
});

productsRouter.get("/", async (req, res, next) => {
    try {
        const options = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
            sort: { title: 1 },
        };
        const filter = {};
        if (req.query.title) {
            filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
            options.sort.title = -1;
        }
        const all = await products.read({ filter, options });
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

productsRouter.put("/:pid", isStockOk, async (req, res, next) => {
    try {
        const { pid } = req.params;
        const data = req.body;
        const response = await products.update(pid, data);
        return res.json({
            statusCode: 200,
            response: "The product " + response + " was updated.",
        });
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
