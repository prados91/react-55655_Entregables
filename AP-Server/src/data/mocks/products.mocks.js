import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.rep.js";
import winstonLog from "../utils/logger/index.js";

function productsMock() {
    let data = {
        title: faker.commerce.product(),
        category: "MOCKS",
        photo: faker.image.urlLoremFlickr({ category: "sports" }),
        price: faker.commerce.price({ min: 50000, max: 350000 }),
        stock: faker.number.int({ min: 50, max: 500 }),
    };
    return data;
}

async function createMocks() {
    try {
        const data = productsMock();
        await repository.create(data);
    } catch (error) {
        winstonLog.ERROR(error);
    }
}
for (let i = 0; i < 100; i++) {
    createMocks();
}
winstonLog.INFO("DATA CREATED OK");
