const errorHandler = (error, req, res, next) => {
    console.error(error);
    return res.json({
        StatusCode: error.statusCode || 500,
        response: `${req.method} ${req.url} ${error.message}`,
    });
};

export default errorHandler;
