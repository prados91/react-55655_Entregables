import fs from "fs";
import crypto from "crypto";
import winstonLog from "../utils/logger/index.js";

class OrdersManager {
    constructor(path) {
        this.path = path;
        this.orders = [];
        this.init();
    }

    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }

    async create({ pid, uid, quantity, state }) {
        try {
            const order = {
                id: crypto.randomBytes(12).toString("hex"),
                pid,
                uid,
                quantity,
                state,
            };
            this.orders.push(order);
            const jsonData = JSON.stringify(this.orders, null, 2);
            await fs.promises.writeFile(this.path, jsonData);
            return order.id;
        } catch (error) {
            throw error;
        }
    }

    async read() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);

            if (readFileParsed.length > 0) {
                return readFileParsed;
            } else {
                throw new Error("There are no orders in the database.");
            }
        } catch (error) {
            winstonLog.ERROR(error.message);
            return error.message;
        }
    }

    async readOne(uid) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);
            const orderByUid = readFileParsed.filter((each) => each.uid === uid);
            if (orderByUid.length > 0) {
                return orderByUid;
            } else {
                throw new Error("The specified user (" + uid + ") don't have any order.");
            }
        } catch (error) {
            throw error;
        }
    }

    async update(oid, quantity, state) {
        try {
            const index = this.orders.findIndex((each) => each.id === oid);

            if (index === -1) {
                throw new Error("Order not found");
            }

            const updOrder = {
                ...this.orders[index],
                quantity: quantity || this.orders[index].quantity,
                state: state || this.orders[index].state,
            };

            this.orders[index] = updOrder;

            const jsonData = JSON.stringify(this.orders, null, 2);
            await fs.promises.writeFile(this.path, jsonData);

            return oid;
        } catch (error) {
            throw error;
        }
    }

    async destroy(oid) {
        try {
            const orders = this.orders.find((each) => each.id === oid);
            if (!orders) {
                throw new Error("There isn't any order with the specified id");
            } else {
                this.orders = this.orders.filter((each) => each.id !== oid);
                const jsonData = JSON.stringify(this.orders, null, 2);
                await fs.promises.writeFile(this.path, jsonData);
                return oid;
            }
        } catch (error) {
            throw error;
        }
    }
}

const orders = new OrdersManager("./src/data/fs/files/orders.json");

export default orders;
