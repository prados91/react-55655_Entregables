const fs = require("fs");

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
            return console.log(error.message);
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
            return console.log(error.message);
        }
    }

    async readOne(id) {
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
            return console.log(error.message);
        }
    }
}

const product = new ProductManager("./sprint2/app/data/product.manager.json");
product.read();
product.createProduct({ title: "Zapatillas", photo: "./image1" });
product.createProduct({ title: "pantalón", photo: "./image2" });
product.createProduct({ title: "Zapatillas", photo: 5 });
product.createProduct({ title: "Zapatillas" });
product.createProduct({ photo: "./image3" });
product.read();
product.readOne(3);
