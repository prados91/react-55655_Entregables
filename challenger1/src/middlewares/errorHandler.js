const errorHandler = (error, req, res, next) => {
    console.error(error)
    return res.json({
        status: 500,
        message: `${req.method} ${req.url} ${error.message}`,
    })
}

export default errorHandler