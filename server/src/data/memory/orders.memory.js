import fs from "fs";
import crypto from "crypto";

class OrderManager {
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

    async createOrder({ pid, uid, quantity, state }) {
        try {
            if (!pid || !uid || !quantity || !state) {
                throw new Error("There is a problem creating the order.");
            } else {
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
                console.log("create " + order.id);
                return order.id;
            }
        } catch (error) {
            throw error;
        }
    }

    async readOrders() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);

            if (readFileParsed.length > 0) {
                console.log(readFileParsed);
                return readFileParsed;
            } else {
                throw new Error("There are no Orders in the database.");
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async readOrdersByUser(uid) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);
            const orderByUid = readFileParsed.find((each) => each.uid === uid);
            if (orderByUid) {
                console.log(orderByUid);
                return orderByUid;
            } else {
                throw new Error("The specified user (" + uid + ") don't have any order.");
            }
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(oid, quantity, state) {
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

    async removeOrders(oid) {
        try {
            const orders = this.orders.find((each) => each.oid === oid);
            if (!orders) {
                throw new Error("There isn't any order with the specified id");
            } else {
                this.orders = this.orders.filter((each) => each.oid !== oid);
                const jsonData = JSON.stringify(this.orders, null, 2);
                await fs.promises.writeFile(this.path, jsonData);
                console.log("deleted " + oid);
                return oid;
            }
        } catch (error) {
            throw error;
        }
    }
}
