class ProductManager {
    static #products = [];
    constructor() {}
    createProduct({ title, photo, ...data }) {
        if (!title || !photo || typeof title !== "string" || typeof photo !== "string") {
            console.log("There is no name or photo location information, or some of this information is incorrect.");
        } else {
            const product = {
                id:
                    ProductManager.#products.length === 0
                        ? 1
                        : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
                title,
                photo,
                price: data.price || 10,
                stock: data.stock || 50,
            };
            ProductManager.#products.push(product);
            return product;
        }
    }
    read() {
        if (ProductManager.#products.length > 0) {
            return console.log(ProductManager.#products);
        } else {
            console.log("There are not products in the data base.");
        }
    }
    readOne(id) {
        const prodById = ProductManager.#products.find((each) => each.id === Number(id));
        if (prodById) {
            return prodById;
        } else {
            console.log("The product with the specified id (" + `${id}` + ") does not exist.");
        }
    }
}

const product = new ProductManager();
product.read();
product.createProduct({ title: "Zapatillas", photo: "./image1" });
product.createProduct({ title: "Zapatillas", photo: "./image2" });
product.createProduct({ title: "Zapatillas", photo: 5 });
product.createProduct({ title: "Zapatillas" });
product.createProduct({ photo: "./image3" });
product.read();
product.readOne(3);
