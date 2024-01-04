import { Router } from "express";
import products from "../../data/fs/products.fs.js"

const productsRouter = Router();

productsRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        const response = await products.createProduct(data);
        if (response === "There is no name or photo location information, or some of this information is incorrect.") {
            return res.json({
                statusCode: 400,
                message: response,
            });
        } else {
            return res.json({
                statusCode: 201,
                response,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

productsRouter.get("/", async (req, res) => {
    try {
        const allProducts = await products.readProducts();
        if (Array.isArray(allProducts)) {
            return res.json({
                statusCode: 200,
                response: allProducts,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: allProducts,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const one = await products.readProductById(pid);
        if (typeof one === "string") {
            return res.json({
                statusCode: 404,
                message: one,
            });
        } else {
            return res.json({
                statusCode: 200,
                response: one,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            statusCode: 500,
            message: error.message,
        });
    }
});

productsRouter.put("/:pid", async (req, res) => {
   
});

productsRouter.delete("/:pid", async (req, res) => {
});

export default productsRouter;
