const pathHandler = (req, res, next) => {
    return res.json({
        status: 404,
        response: `${req.method} ${req.url} not found endpoint`,
    });
};

export default pathHandler;
