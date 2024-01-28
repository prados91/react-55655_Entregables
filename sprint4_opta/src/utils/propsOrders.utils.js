const propsOrdersUtils = (data) => {
    const { pid, uid, quantity, state } = data;
    if (!pid || !uid || !quantity || !state) {
        const error = new Error("There is a problem creating the order.");
        error.statusCode = 404;
        throw error;
    }
};

export default propsOrdersUtils;
