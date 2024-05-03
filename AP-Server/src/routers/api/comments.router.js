import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/comments.controller.js";

class CommentsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER", "PREM"], create);
        this.read("/", ["USER", "PREM","ADMIN"], read);//ESTABA PUBLIC
        this.read("/:cid", ["USER", "PREM","ADMIN"], readOne);//ESTABA PUBLIC
        this.update("/:cid", ["USER", "PREM"], update);
        this.destroy("/:cid", ["USER", "PREM"], destroy);
    }
}

const commentsRouter = new CommentsRouter();
export default commentsRouter.getRouter();
