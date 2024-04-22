import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import commentsRouter from "./comments.router.js";
import winstonLog from "../../utils/logger/index.js";
class ApiRouter extends CustomRouter {
    init() {
        this.router.use("/users", usersRouter);
        this.router.use("/products", productsRouter);
        this.router.use("/orders", ordersRouter);
        this.router.use("/sessions", sessionsRouter);
        this.router.use("/comments", commentsRouter);

        this.router.use("/logger", async (req, res, next) => {
            try {
                winstonLog.HTTP("LOG HTTP");
                winstonLog.INFO("LOG INFO");
                winstonLog.WARN("LOG WARN");
                winstonLog.ERROR("LOG ERROR");

                return res.json({ response: "WINSTON OK" });
            } catch (error) {
                return next(error);
            }
        });
    }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
