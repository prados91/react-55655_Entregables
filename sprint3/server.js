import express from "express";
import products from "./data/fs/products.fs.js";
import users from "./data/fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = console.log("server ready on port " + PORT);

//MIDDLEWARES
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//ENDPOINTS
//PRODUCTS
//CREATE
server.post("/api/products", async (req, res) => {
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

//READ
server.get("/api/products", async (req, res) => {
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

//READ ONE
server.get("/api/products/:pid", async (req, res) => {
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

//USERS
//CREATE
server.post("/api/users", async (req, res) => {
    try {
        const data = req.body;
        const response = await users.createUser(data);
        if (response === "There is no name, photo or email information, or some of this information is incorrect.") {
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

//READ
server.get("/api/users", async (req, res) => {
    try {
        const allUsers = await users.readUsers();
        if (Array.isArray(allUsers)) {
            return res.json({
                statusCode: 200,
                response: allUsers,
            });
        } else {
            return res.json({
                statusCode: 404,
                message: allUsers,
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

//READ ONE
server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const one = await users.readUserById(uid);
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