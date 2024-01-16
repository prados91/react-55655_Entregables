import { Router } from "express";
import products from "../../data/fs/products.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
    try {
        const all = await products.readProducts();
        return res.render("products", { products: all, title: "products" });
    } catch (error) {
        next(error);
    }
});
productsRouter.get("/new", (req, res, next) => {
    try {
        return res.render("new", { title: "NEW" });
    } catch (error) {
        next(error);
    }
});

export default productsRouter;
