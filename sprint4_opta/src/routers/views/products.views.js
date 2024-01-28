import { Router } from "express";
//import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
    try {
        const all = await products.read({});
        return res.render("products", { products: all, title: "PRODUCTS" });
    } catch (error) {
        next(error);
    }
});
productsRouter.get("/forms", async (req, res, next) => {
    try {
        return res.render("forms", { title: "NEW" });
    } catch (error) {
        next(error);
    }
});

export default productsRouter;
