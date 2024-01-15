import { Router } from "express";
import products from "../../data/fs/products.fs.js";
import propsProducts from "../../middlewares/propsProducts.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await products.createProduct(data);
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
        const all = await products.readProducts();
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
        const one = await products.readProductById(pid);
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
        const response = await products.updateProduct(pid, data);
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
        const response = await products.removeProductById(pid);
        return res.json({
            statusCode: 200,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

export default productsRouter;
