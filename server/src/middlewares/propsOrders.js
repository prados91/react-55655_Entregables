const propsOrders = (req, res, next) => {
    const { pid,uid,quantity,state } = req.body;
    if (!pid || !uid || !quantity || !state) {
        const error = new Error("There is a problem creating the order.");
        error.statusCode = 404;
        throw error;
    } else {
        return next();
    }
};
export default propsOrders;