import propsOrdersUtils from "../utils/propsOrders.utils.js";

const propsOrders = (req, res, next) => {
    try {
        propsOrdersUtils(req.body);
        return next();
    } catch (error) {
        return next(error);
    }
};
export default propsOrders;
