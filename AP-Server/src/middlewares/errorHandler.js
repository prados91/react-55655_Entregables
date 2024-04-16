import winston_log from "../utils/logger/index.js";
const errorHandler = (error, req, res, next) => {
    winston_log.WARN(error);
    return res.json({
        StatusCode: error.statusCode || 500,
        response: `${req.method} ${req.url} ${error.message}`,
    });
};

export default errorHandler;
