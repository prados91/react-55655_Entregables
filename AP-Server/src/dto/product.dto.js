import argsUtil from "../utils/args.utils.js";
import crypto from "crypto";

class ProductDTO {
    constructor(data) {
        argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.photo = data.photo || "https://i.postimg.cc/HxdvTwqJ/events.jpg";
        this.stock = data.stock;
        this.price = data.price || 10;
        this.category = data.category;
        this.date = data.date || new Date();
        argsUtil.env !== "prod" && (this.updatedAt = new Date());
        argsUtil.env !== "prod" && (this.createdAt = new Date());
    }
}

export default ProductDTO;
