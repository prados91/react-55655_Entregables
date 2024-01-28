const propsProductsUtils = (data) => {
    const { title, photo } = data;
    if (!title || !photo || typeof title !== "string" || typeof photo !== "string") {
        const error = new Error(
            "There is no name or photo location information, or some of this information is incorrect."
        );
        error.statusCode = 404;
        throw error;
    }
};

export default propsProductsUtils;
