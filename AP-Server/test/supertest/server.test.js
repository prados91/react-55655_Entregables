import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
const { products } = dao;

const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("Testeando SERVER API", () => {
    const user = {
        name: "SUPERTEST",
        email: "augusto@coder.com",
        password: "hola1234",
        role: "ADMIN",
        verified: true,
    };
    let uid;
    let token = {};
    /*it("Registro de un usuario correctamente", async function () {
        this.timeout(10000);
        const response = await requester.post("/sessions/register").send(user);
        const { _body, statusCode } = response;
        console.log(statusCode);
        //uid = _body.payload._id;
        expect(statusCode).to.be.equals(201);
    });*/
    it("Inicio de sesión correctamente", async () => {
        const response = await requester.post("/sessions/login").send(user);
        const { statusCode, headers } = response;
        //console.log(headers);
        token.key = headers["set-cookie"][0].split("=")[0];
        token.value = headers["set-cookie"][0].split("=")[1];
        expect(statusCode).to.be.equals(200);
    });
    it("Verifico usuario", async () => {
        const response = await requester.get(`/users/?email=${user.email}`);
        const { statusCode, headers, docs } = response;
        //console.log(docs);
        expect(statusCode).to.be.equals(200);
    });
    it("Cerrado de sesión correctamente", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", [token.key + "=" + token.value]);
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
    it("Eliminación de un usuario correctamente", async () => {
        //console.log(uid);
        const response = await requester.delete("/users/" + uid);
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
});
