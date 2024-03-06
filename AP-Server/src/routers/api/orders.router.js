import CustomRouter from "../CustomRouter.js";
//import orders from "../../data/fs/orders.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

export default class OrdersRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const data = {
                    user_id: req.user._id,
                    product_id: req.body.product_id,
                };
                const response = await orders.create(data);
                return res.success201(response);
            } catch (error) {
                return next(error);
            }
        });

        this.read("/", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const options = {
                    limit: req.query.limit || 20,
                    page: req.query.page || 1,
                    sort: { title: 1 },
                    lean: true,
                };
                const filter = {};
                if (req.query.title) {
                    filter.title = new RegExp(req.query.title.trim(), "i");
                }
                if (req.query.sort === "desc") {
                    options.sort.title = "desc";
                }
                const all = await orders.read({ filter, options });
                return res.success200(all);
            } catch (error) {
                return next(error);
            }
        });

        this.read("/total/:uid", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const { uid } = req.params;
                const report = await orders.report(uid);
                return res.success200(report);
            } catch (error) {
                return next(error);
            }
        });

        this.read("/:oid", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const { oid } = req.params;
                const one = await orders.readOne(oid);
                return res.success200(one);
            } catch (error) {
                return next(error);
            }
        });

        this.update("/:oid", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const { oid } = req.params;
                const data = req.body;
                const response = await orders.update(oid, data);
                return res.success200(response);
            } catch (error) {
                return next(error);
            }
        });

        this.destroy("/:oid", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const { oid } = req.params;
                const response = await orders.destroy(oid);
                return res.success200(response);
            } catch (error) {
                return next(error);
            }
        });
    }
}
