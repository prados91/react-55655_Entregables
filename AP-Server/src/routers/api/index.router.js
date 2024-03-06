import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";

import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter();

export default class ApiRouter extends CustomRouter {
    init() {
        this.use("/users", usersRouter);
        this.use("/products", product.getRouter());
        this.use("/orders", passCallBackMid("jwt"), ordersRouter);
        this.use("/sessions", sessionsRouter);
    }
}
