const propsUsersUtils = (data) => {
    const { name, photo, email } = data;
    if (
        !name ||
        !photo ||
        !email ||
        typeof name !== "string" ||
        typeof photo !== "string" ||
        typeof email !== "string"
    ) {
        const error = new Error(
            "There is no name, photo or email information, or some of this information is incorrect."
        );
        error.statusCode = 404;
        throw error;
    }
};

export default propsUsersUtils;
