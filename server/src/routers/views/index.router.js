import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
    try {
        const mainProducts = ["1", "2", "3"];
        return res.render("index", { products: mainProducts, details: "Detalle" });
    } catch (error) {
        next(error);
    }
});

export default viewsRouter;
