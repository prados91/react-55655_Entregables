const propsOrders = (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        const error = new Error("The user ID (" + `${id}` + ") don't have any order.");
        error.statusCode = 404;
        throw error;
    } else {
        return next();
    }
};
export default propsOrders;
