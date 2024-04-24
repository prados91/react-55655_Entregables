import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        photo: { type: String, default: "https://i.postimg.cc/wTgNFWhR/profile.png" },
        price: { type: Number, default: 1000 },
        stock: { type: Number, default: 50 },
        owner_id: { type: String, required: true, ref: "users", enum: ["ADMIN", "PREM"] },
    },
    { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;
