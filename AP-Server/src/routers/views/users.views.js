import CustomRouter from "../CustomRouter.js";
//import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";

export default class UsersRouter extends CustomRouter {
    init() {
        this.read("/", ["ADMIN", "PREM", "PUBLIC"], async (req, res, next) => {
            try {
                const all = await users.read({});
                return res.render("register", { users: all, title: "USERS" });
            } catch (error) {
                next(error);
            }
        });
        this.read("/new", ["ADMIN", "PREM", "PUBLIC"], (req, res, next) => {
            try {
                return res.render("new", { title: "NEW" });
            } catch (error) {
                next(error);
            }
        });
    }
}
z;
