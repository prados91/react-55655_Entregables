import winston_log from "../utils/logger/index.js";

const pathHandler = (req, res, next) => {
    const response = `${req.method} ${req.url} not found endpoint`;
    winston_log.WARN(response);
    return res.json({
        statusCode: 404,
        response: response,
    });
};

export default pathHandler;
