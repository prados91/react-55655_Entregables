import crypto from "crypto";

class CommentsManager {
    static #comments = [];
    constructor() {}
    async create(data) {
        try {
            const comment = {
                id: crypto.randomBytes(12).toString("hex"),
                user_id: data.user_id,
                product_id: data.product_id,
                text: data.text,
            };
            CommentsManager.#comments.push(comment);
            return comment.id;
        } catch (error) {
            throw error;
        }
    }
    read() {
        try {
            if (CommentsManager.#comments.length === 0) {
                const error = new Error("NOT FOUND!");
                error.statusCode = 404;
                throw error;
            } else {
                return CommentsManager.#comments;
            }
        } catch (error) {
            throw error;
        }
    }
    readOne(id) {
        try {
            const one = CommentsManager.#comments.find((each) => each.id === id);
            if (!one) {
                const error = new Error("NOT FOUND!");
                error.statusCode = 404;
                throw error;
            } else {
                return one;
            }
        } catch (error) {
            throw error;
        }
    }
    async update(uid, data) {
        try {
            const one = CommentsManager.#comments.readOne(uid);
            if (one) {
                for (let each in data) {
                    one[each] = data[each];
                }
            }
            return one;
        } catch (error) {
            throw error;
        }
    }
    async destroy(id) {
        try {
            const one = this.readOne(id);
            if (one) {
                CommentsManager.#comments = CommentsManager.#comments.filter((each) => each.id !== id);
            }
            return one;
        } catch (error) {
            throw error;
        }
    }
}

const comments = new CommentsManager();
export default { comments };
