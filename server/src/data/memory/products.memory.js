import fs from "fs";
import crypto from "crypto";

class ProductsManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.init();
    }
    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async createProduct({ title, photo, ...data }) {
        try {
            if (!title || !photo || typeof title !== "string" || typeof photo !== "string") {
                throw new Error(
                    "There is no name or photo location information, or some of this information is incorrect."
                );
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title,
                    photo,
                    price: data.price || 100,
                    stock: data.stock || 500,
                };
                this.products.push(product);
                const jsonData = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, jsonData);
                console.log("create " + product.id);
                return product.id;
            }
        } catch (error) {
            throw error;
        }
    }

    async readProducts() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);

            if (readFileParsed.length > 0) {
                console.log(readFileParsed);
                return readFileParsed;
            } else {
                throw new Error("There are no products in the database.");
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async readProductById(id) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);
            const prodById = readFileParsed.find((each) => each.id === id);
            if (prodById) {
                console.log(prodById);
                return prodById;
            } else {
                throw new Error("The product with the specified id (" + `${id}` + ") does not exist.");
            }
        } catch (error) {
            throw error;
        }
    }

    async removeProductById(id) {
        try {
            let one = this.products.find((each) => each.id === id);
            if (!one) {
                throw new Error("There isn't any product");
            } else {
                this.products = this.products.filter((each) => each.id !== id);
                const jsonData = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, jsonData);
                console.log("deleted " + id);
                return id;
            }
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(pid, data) {
        try {
            const one = this.readProductById(pid);
            if (one) {
                one.title = data.title || one.title;
                one.photo = data.photo || one.photo;
                one.price = data.price || one.price;
                one.stock = data.stock || one.stock;

                const jsonData = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, jsonData);

                return "Product updated";
            } else {
                throw new Error("There isn't any product");
            }
        } catch (error) {
            throw error;
        }
    }
}

const product = new ProductsManager("./src/data/fs/files/products.json");

export default product;
