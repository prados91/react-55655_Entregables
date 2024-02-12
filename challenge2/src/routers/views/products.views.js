import { Router } from "express";
//import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
    try {
        const orderAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { stock: 1 },
        };
        const filter = {};
        const all = await products.read({ filter, orderAndPaginate });
        const allDocsAsJSON = all.docs.map((doc) => doc.toObject());
        console.log(allDocsAsJSON)
        return res.render("products", { products: allDocsAsJSON, title: "PRODUCTS" });
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
