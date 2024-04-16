import winston_log from "../utils/logger/index.js";
const errorHandler = (error, req, res, next) => {
    if (!error.statusCode || error.statusCode === 500) {
        error.statusCode = 500;
        winston_log.ERROR(error.message);
    } else {
        winston_log.WARN(error.message);
    }
    return res.json({
        statusCode: error.statusCode,
        path: `${req.method} ${req.url}`,
        message: error.message,
    });
};

export default errorHandler;
