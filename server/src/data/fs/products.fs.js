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
            const data = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, data);
        }
    }

    async createProduct({ title, photo, ...data }) {
        try {
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
                //console.log(prodById);
                return prodById;
            } else {
                throw new Error("The product with the specified id (" + id + ") does not exist.");
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(pid, data) {
        try {
            const index = this.products.findIndex((product) => product.id === pid);

            if (index === -1) {
                throw new Error("Product not found");
            }

            const updatedProduct = {
                ...this.products[index],
                title: data.title || this.products[index].title,
                photo: data.photo || this.products[index].photo,
                price: data.price || this.products[index].price,
                stock: data.stock || this.products[index].stock,
            };

            this.products[index] = updatedProduct;

            const jsonData = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, jsonData);

            return pid;
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
}

const products = new ProductsManager("./src/data/fs/files/products.json");

export default products;
