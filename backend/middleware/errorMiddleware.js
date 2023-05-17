// Middleware are functions that execute during a request response cycle

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 //if res.status code is there then use that otherwise use 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}