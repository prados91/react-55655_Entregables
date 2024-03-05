import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";

import passCallBack from "../../middlewares/passCallBack.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.get("/real", passCallBack("jwt"), isAdmin, (req, res, next) => {
    try {
        return res.render("real", { title: "REAL" });
    } catch (error) {
        next(error);
    }
});

productsRouter.get("/form", passCallBack("jwt"), isAdmin, (req, res, next) => {
    try {
        return res.render("form", { title: "NEW PRODUCT" });
    } catch (error) {
        next(error);
    }
});

productsRouter.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.render("detail", { product: one, title: one.title.toUpperCase() });
    } catch (error) {
        next(error);
    }
});

export default productsRouter;
