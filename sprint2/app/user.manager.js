const fs = require("fs");

class UserManager {
    constructor(path) {
        this.path = path;
        this.users = [];
        this.init();
    }
    init() {
        const file = fs.existsSync(this.path);
        if (file) {
            this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }
    async createUser({ name, photo, email }) {
        try {
            if (
                !name ||
                !photo ||
                !email ||
                typeof name !== "string" ||
                typeof photo !== "string" ||
                typeof email !== "string"
            ) {
                throw new Error(
                    "There is no name, photo or email information, or some of this information is incorrect."
                );
            } else {
                const user = {
                    id: this.users.length === 0 ? 1 : this.users[this.users.length - 1].id + 1,
                    name,
                    photo,
                    email,
                };
                this.users.push(user);
                await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, 2));
                return true;
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    async read() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);

            if (readFileParsed.length > 0) {
                return console.log(readFileParsed);
            } else {
                throw new Error("There are no users in the database.");
            }
        } catch (error) {
            return console.log(error.message);
        }
    }

    async readOne(id) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);
            const userById = readFileParsed.find((each) => each.id === Number(id));
            if (userById) {
                return console.log(userById);
            } else {
                throw new Error("The user with the specified id (" + `${id}` + ") does not exist.");
            }
        } catch (error) {
            return console.log(error.message);
        }
    }
}

const user = new UserManager("./sprint2/app/data/user.manager.json");
user.read();
user.createUser({ name: "Pepe", photo: "./image1", email: "aa" });
user.createUser({ name: "Moni", photo: "./image2", email: "" });
user.createUser({ name: "Moni", photo: "./image2", email: 5 });
user.read();
user.readOne(3);
