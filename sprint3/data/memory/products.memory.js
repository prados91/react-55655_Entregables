import fs from "fs";

class ProductManager {
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
                    id: this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1,
                    title,
                    photo,
                    price: data.price || 10,
                    stock: data.stock || 50,
                };
                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                return true;
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async read() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);

            if (readFileParsed.length > 0) {
                return console.log(readFileParsed);
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
            const prodById = readFileParsed.find((each) => each.id === Number(id));
            if (prodById) {
                return console.log(prodById);
            } else {
                throw new Error("The product with the specified id (" + `${id}` + ") does not exist.");
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
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
            console.log(error.message);
            return error.message;
        }
    }
}

const product = new ProductManager("./sprint2/app/data/product.manager.json");

export default product;
