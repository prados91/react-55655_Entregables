import { Router } from "express";
import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
    try {
        const all = await users.readUsers();
        return res.render("register", { users: all, title: "USERS" });
    } catch (error) {
        next(error);
    }
});
usersRouter.get("/new", (req, res, next) => {
    try {
        return res.render("new", { title: "NEW" });
    } catch (error) {
        next(error);
    }
});

export default usersRouter;
