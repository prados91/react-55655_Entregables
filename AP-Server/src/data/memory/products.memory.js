import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductsManager {
    static #products = [];

    constructor() {}
    async create(data) {
        try {
            const product = {
                id: crypto.randomBytes(12).toString("hex"),
                title: data.title,
                photo: data.photo || "https://i.postimg.cc/HxdvTwqJ/products.jpg",
                stock: data.stock,
                price: data.price || 10,
                category: data.category,
                date: data.date || new Date(),
            };
            ProductsManager.#products.push(product);
            return product;
        } catch (error) {
            throw error;
        }
    }
    read({ filter, options }) {
        //este metodo para ser compatible con las otras persistencias
        //necesita agregar los filtros
        //y la paginacion/orden
        try {
            if (ProductsManager.#products.length === 0) {
                const error = new Error("NOT FOUND!");
                error.statusCode = 404;
                throw error;
            } else {
                return ProductsManager.#products;
            }
        } catch (error) {
            throw error;
        }
    }
    readOne(id) {
        try {
            const one = ProductsManager.#products.find((each) => each.id === id);
            if (!one) {
                const error = new Error("NOT FOUND!");
                error.statusCode = 404;
                throw error;
            } else {
                return one;
            }
        } catch (error) {
            throw error;
        }
    }
    async update(pid, data) {
        try {
            const one = this.readOne(pid);
            notFoundOne(one);
            for (let each in data) {
                one[each] = data[each];
            }
            return one;
        } catch (error) {
            throw error;
        }
    }
    async destroy(id) {
        try {
            const one = this.readOne(id);
            notFoundOne(one);
            ProductsManager.#products = ProductsManager.#products.filter((each) => each.id !== id);
            return one;
        } catch (error) {
            throw error;
        }
    }
}

const products = new ProductsManager();
export default products;
