import { Router } from "express";
//import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.js";

const usersRouter = Router();

//usersRouter.post("/", propsUsers, async (req, res, next) => {
usersRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const response = await users.create(data);
        return res.json({
            statusCode: 201,
            response: response,
        });
    } catch (error) {
        return next(error);
    }
});

usersRouter.get("/", async (req, res, next) => {
    try {
        const options = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { name: 1 },
        };
        const filter = {};
        if (req.query.email) {
            filter.email = new RegExp(req.query.email.trim(), "i");
        }
        if (req.query.name) {
            filter.name = new RegExp(req.query.name.trim(), "i");
        }
        if (req.query.sort === "desc") {
            options.sort.name = -1;
        }
        const all = await users.read({ filter, options });
        return res.json({
            statusCode: 200,
            response: all,
        });
    } catch (error) {
        return next(error);
    }
});

usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
});

usersRouter.get("/find/:email", async (req, res, next) => {
    try {
        const { email } = req.params;
        const one = await users.readByEmail(email);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
});

usersRouter.put("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const response = await users.update(uid, data);
        if (response) {
            return res.json({
                statusCode: 200,
                response: "The user " + response + " was updated.",
            });
        }
    } catch (error) {
        return next(error);
    }
});

usersRouter.delete("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const response = await users.destroy(uid);
        return res.json({
            statusCode: 200,
            response,
        });
    } catch (error) {
        return next(error);
    }
});

export default usersRouter;
