const ErrorHandler = require('../utils/errorhandler.js');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb Id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;

        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if(err.code === 11000) {
       const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
       
       err =  new ErrorHandler(message, 499);
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        
        err =  new ErrorHandler(message, 499);
    }

    // JWT Expire error
    if(err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired , try again`;
        
        err =  new ErrorHandler(message, 499);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}