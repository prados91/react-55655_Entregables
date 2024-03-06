import CustomRouter from "../CustomRouter.js";
//import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";

export default class UsersRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN"], async (req, res, next) => {
            try {
                const data = req.body;
                const response = await users.create(data);
                return res.success201(response);
            } catch (error) {
                return next(error);
            }
        });

        this.read("/", ["ADMIN"], async (req, res, next) => {
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
                    options.sort.name = "desc";
                }
                const all = await users.read({ filter, options });
                return res.success200(all);
            } catch (error) {
                return next(error);
            }
        });

        this.read("/:uid", ["ADMIN"], async (req, res, next) => {
            try {
                const { uid } = req.params;
                const one = await users.readOne(uid);
                return res.success200(one);
            } catch (error) {
                return next(error);
            }
        });

        this.read("/find/:email", ["ADMIN"], async (req, res, next) => {
            try {
                const { email } = req.params;
                const one = await users.readByEmail(email);
                return res.success200(one);
            } catch (error) {
                return next(error);
            }
        });

        this.update("/:uid", ["ADMIN"], async (req, res, next) => {
            try {
                const { uid } = req.params;
                const data = req.body;
                const response = await users.update(uid, data);
                return res.success200(response);
            } catch (error) {
                return next(error);
            }
        });

        this.destroy("/:uid", ["ADMIN"], async (req, res, next) => {
            try {
                const { uid } = req.params;
                const response = await users.destroy(uid);
                return res.success200(response);
            } catch (error) {
                return next(error);
            }
        });

        this.read("/stats", ["ADMIN"], async (req, res, next) => {
            try {
                const all = await users.stats({});
                return res.success200(all);
            } catch (error) {
                return next(error);
            }
        });
    }
}
