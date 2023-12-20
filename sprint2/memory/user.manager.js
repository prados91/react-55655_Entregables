class UserManager {
    static #users = [];
    createUser({ name, photo, email }) {
        if (
            !name ||
            !photo ||
            !email ||
            typeof name !== "string" ||
            typeof photo !== "string" ||
            typeof email !== "string"
        ) {
            console.log("There is no name, photo or email information, or some of this information is incorrect.");
        } else {
            const user = {
                id: UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id + 1,
                name,
                photo,
                email,
            };
            UserManager.#users.push(user);
            return user;
        }
    }

    read() {
        if (UserManager.#users.length > 0) {
            return console.log(UserManager.#users);
        } else {
            console.log("There are not users in the data base");
        }
    }
    readOne(id) {
        const userById = UserManager.#users.find((each) => each.id === Number(id));
        if (userById) {
            return userById;
        } else {
            console.log("The user with the specified id (" + `${id}` + ") does not exist");
        }
    }
}

const user = new UserManager();
user.read();
user.createUser({ name: "Pepe", photo: "./image1", email: "aa" });
user.createUser({ name: "Moni", photo: "./image2", email: "" });
user.createUser({ name: "Moni", photo: "./image2", email: 5 });
user.read();
user.readOne(3);
