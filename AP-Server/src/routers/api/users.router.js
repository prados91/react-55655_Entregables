import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy, readByEmail } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
    init() {
        this.create("/", ["PUBLIC"], create);
        this.read("/", ["ADMIN"], read);
        this.read("/:uid", ["USER", "PREM"], readOne);
        this.update("/:uid", ["USER", "PREM"], update);
        this.destroy("/:uid", ["USER", "PREM"], destroy);
        this.read('/:email',["ADMIN"], readByEmail)
    }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
