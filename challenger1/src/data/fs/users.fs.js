import fs from "fs";
import crypto from "crypto";

class UsersManager {
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
                    id: crypto.randomBytes(12).toString("hex"),
                    name,
                    photo,
                    email,
                };
                this.users.push(user);

                const jsonData = JSON.stringify(this.users, null, 2);
                await fs.promises.writeFile(this.path, jsonData);
                console.log("create " + user.id);
                return user.id;
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async readUsers() {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);

            if (readFileParsed.length > 0) {
                console.log(readFileParsed);
                return readFileParsed;
            } else {
                throw new Error("There are no users in the database.");
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async readUserById(id) {
        try {
            const readFile = await fs.promises.readFile(this.path, "utf-8");
            const readFileParsed = JSON.parse(readFile);
            const userById = readFileParsed.find((each) => each.id === id);
            if (userById) {
                console.log(userById)
                return userById;
            } else {
                throw new Error("The user with the specified id (" + `${id}` + ") does not exist.");
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async removeUserById(id) {
        try {
            let one = this.users.find((each) => each.id === id);
            if (!one) {
                throw new Error("There isn't any product");
            } else {
                this.users = this.users.filter((each) => each.id !== id);
                const jsonData = JSON.stringify(this.users, null, 2);
                await fs.promises.writeFile(this.path, jsonData);
                console.log("deleted " + id);
                return id;
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async updateUser(uid, data) {
        try {
            const all = await this.readUsers();
            const index = all.findIndex((u) => u.id === uid);

            if (index !== -1) {
                all[index] = {
                    ...all[index],
                    name: data.name || all[index].name,
                    photo: data.photo || all[index].photo,
                    email: data.email || all[index].email,
                };
                const jsonData = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, jsonData);
            } else {
                throw new Error("There isn't any user");
            }
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
}

const user = new UsersManager("./src/data/fs/files/users.json");

export default user;
