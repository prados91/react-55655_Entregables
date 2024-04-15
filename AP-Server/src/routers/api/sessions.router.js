import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import { register, login, signout, verifyAccount, me } from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
    init() {
        this.create("/register", ["PUBLIC"], passCallBack("register"), register);
        this.create("/login", ["PUBLIC"], passCallBack("login"), login);
        this.create("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
        this.create("/signout", ["USER", "ADMIN", "PREM"], passCallBack("jwt"), signout);
        this.create("/verify", ["PUBLIC"], verifyAccount);
        this.create("/me", ["USER", "ADMIN", "PREM"], me);
    }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
