import Order from "./models/orders.mongo.js";
import Product from "./models/products.mongo.js";
import User from "./models/users.mongo.js";

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
    async read(obj) {
        try {
            const { filter, order } = obj;
            //const all = await this.model.find(filter).populate("user_id").populate("product_id").sort(order);
            const all = await this.model.find(filter).sort(order);
            if (all.length === 0) {
                const error = new Error("There aren't documents");
                error.statusCode = 404;
                throw error;
            }
            return all;
            //notFound(all);
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
