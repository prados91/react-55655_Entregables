import propsUsersUtils from "../utils/propsUsers.utils.js";

const propsUsers = (req, res, next) => {
    try {
        propsUsersUtils(req.body);
        return next();
    } catch (error) {
        return next(error);
    }
};
export default propsUsers;
