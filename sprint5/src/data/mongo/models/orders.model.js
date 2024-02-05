import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
    {
        user_id: { type: Types.ObjectId, required: true, ref: "users" },
        product_id: { type: Types.ObjectId, required: true, ref: "products" },
        quantity: { type: Number, default: 1 },
        state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"] },
    },
    {
        timestamps: true,
    }
);

const Order = model(collection, schema);
export default Order;
