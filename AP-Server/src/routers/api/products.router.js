import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "PREM"], create);
        this.read("/", ["PUBLIC"], read);
        this.read("/:pid", ["PUBLIC"], readOne);
        this.update("/:pid", ["ADMIN", "PREM"], update);
        this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
    }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
