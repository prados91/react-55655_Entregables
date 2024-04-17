import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import commentsRouter from "./comments.router.js";

import fs from "fs";

class ApiRouter extends CustomRouter {
    init() {
        this.router.use("/users", usersRouter);
        this.router.use("/products", productsRouter);
        this.router.use("/orders", ordersRouter);
        this.router.use("/sessions", sessionsRouter);
        this.router.use("/comments", commentsRouter);

        this.router.use("/logger", async (req, res, next) => {
            try {
                const log = fs.readFileSync("./src/utils/errors/errors.log", "utf-8");
                const log2 = log
                    .split("\n")
                    .map((e) => e.trim())
                    .filter((e) => e !== "");
                return res.json({ response: log2 });
            } catch (error) {
                return next(error);
            }
        });
    }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
