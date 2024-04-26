import CustomRouter from "../CustomRouter.js";
import dao from  "../../data/index.factory.js";
const { orders, users } = dao;
import passCallBack from "../../middlewares/passCallBack.mid.js";

class OrdersRouter extends CustomRouter {
    init() {
        this.read("/", ["ADMIN", "PREM", "USER"], passCallBack("jwt"), async (req, res, next) => {//ESTABA PUBLIC
            try {
                const options = {
                    limit: req.query.limit || 20,
                    page: req.query.page || 1,
                    sort: { title: 1 },
                    lean: true,
                };
                const user = await users.readByEmail(req.user.email);
                const filter = {
                    user_id: user._id,
                };
                const all = await orders.read({ filter, options });
                return res.render("orders", { title: "MY CART", orders: all.docs });
            } catch (error) {
                return res.render("orders", {
                    title: "MY CART",
                    message: "NO ORDERS YET!",
                });
            }
        });
    }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
