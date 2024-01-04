import { Router } from "express";
import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        const response = await users.createUser(data);
        if (response === "There is no name, photo or email information, or some of this information is incorrect.") {
            return res.json({
                statusCode: 400,
                response: response,
            });
        } else {
            return res.json({
                statusCode: 201,
                response,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            response: error.message,
        });
    }
});

usersRouter.get("/", async (req, res) => {
    try {
        const allUsers = await users.readUsers();
        if (Array.isArray(allUsers)) {
            return res.json({
                statusCode: 200,
                response: allUsers,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: allUsers,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            response: error.message,
        });
    }
});

usersRouter.get("/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const one = await users.readUserById(uid);
        if (typeof one === "string") {
            return res.json({
                statusCode: 404,
                response: one,
            });
        } else {
            return res.json({
                statusCode: 200,
                response: one,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            response: error.message,
        });
    }
});

usersRouter.put("/:uid", async (req, res) => {});

usersRouter.delete("/:uid", async (req, res) => {});

export default usersRouter;
