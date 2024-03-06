import CustomRouter from "../CustomRouter.js";
import UsersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import OrdersRouter from "./orders.router.js";
import SessionsRouter from "./sessions.router.js";

import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const product = new ProductsRouter();
const productsRouter = product.getRouter();
const user = new UsersRouter();
const usersRouter = user.getRouter();
const order = new OrdersRouter();
const ordersRouter = order.getRouter();
const session = new SessionsRouter();
const sessionsRouter = session.getRouter();

export default class ApiRouter extends CustomRouter {
    init() {
        this.router.use("/users", usersRouter);
        this.router.use("/products", productsRouter);
        this.router.use("/orders", passCallBackMid("jwt"), ordersRouter);
        this.router.use("/sessions", sessionsRouter);
    }
}
