import { Router } from "express";

const formsRouter = Router();

formsRouter.get("/", async (req, res, next) => {
    try {
        return res.render("forms", { title: "NEW" });
    } catch (error) {
        next(error);
    }
});

export default formsRouter;
