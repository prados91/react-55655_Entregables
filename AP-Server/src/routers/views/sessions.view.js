import CustomRouter from "../CustomRouter.js";

export default class SessionsRouter extends CustomRouter {
    init() {
        this.read("/register", ["PUBLIC"], async (req, res, next) => {
            try {
                return res.render("register", { title: "REGISTER" });
            } catch (error) {
                return next(error);
            }
        });

        this.read("/login", ["ADMIN", "PREM", "PUBLIC"], async (req, res, next) => {
            try {
                return res.render("login", { title: "LOGIN" });
            } catch (error) {
                return next(error);
            }
        });
    }
}
