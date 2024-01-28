import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema(
    {
        title: { type: String, required: true },
        photo: { type: String, default: "https://i.postimg.cc/wTgNFWhR/profile.png" },
        price: { type: Number, default: 1000 },
        stock: { type: Number, default: 50 },
    },
    { timestamps: true }
);

const Product = model(collection, schema);
export default Product;
