import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
//import cookiesRouter from "./cookies.router.js";
import sessionsRouter from "./sessions.router.js";

import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", passCallBackMid("jwt"), ordersRouter);
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
