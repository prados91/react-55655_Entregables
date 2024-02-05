import Order from "./models/orders.model.js";
import Product from "./models/products.model.js";
import User from "./models/users.model.js";

import notFound from "../../utils/notFound.utils.js";

class MongoManager {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const one = await this.model.create(data);
            return one._id;
        } catch (error) {
            throw error;
        }
    }

    async read({ filter, order }) {
        try {
            const all = await this.model
                .find(filter, "-createdAt -updatedAt -__v")
                //.populate("user_id","-password -createdAt -updatedAt -__v")
                //.populate("event_id","name place price")
                .sort(order);
            if (all.length === 0) {
                const error = new Error("There aren't any document");
                error.statusCode = 404;
                throw error;
            }
            return all;
        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findById(id);
            notFound(one);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async readByEmail(email) {
        try {
            const one = await this.model.find({ email: email });
            notFound(one);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const opt = { new: true };
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            notFound(one);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id);
            notFound(one);
            return one;
        } catch (error) {
            throw error;
        }
    }
}

const orders = new MongoManager(Order);
const products = new MongoManager(Product);
const users = new MongoManager(User);

export { orders, products, users };

export default MongoManager;
