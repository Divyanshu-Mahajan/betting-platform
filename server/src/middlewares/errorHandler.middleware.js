const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = err.errors || [];

    if (err.name === "SequelizeValidationError") {
        statusCode = 400;
        message = "Validation error";
        errors = err.errors.map((e) => e.message);
    }

    if (err.name === "SequelizeUniqueConstraintError") {
        statusCode = 409;
        message = "Duplicate field value";
        errors = err.errors.map((e) => e.message);
    }

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }

    if (!(err instanceof ApiError)) {
        err = new ApiError(statusCode, message, errors);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors || [],
    });
};

module.exports = errorHandler;
