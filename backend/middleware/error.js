// we use error handler coz when we use this our server will not close if there is a error

const ErrorHandler = require("../utils/errorhandler");


module.exports = (err, req, res, next) => {             //format of RESTful API
    err.statusCode = err.statusCode || 500;      
    err.message = err.message || "Internal Server Error"; 


    //wrong mongodb id error
    //wrong error id error or short id error/coz catch asyncerror.
    
    if(err.name === "CastError"){
        const message =` Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }


//duplicate error for email register
    if(err.code === 11000){
        const message =` Duplicate ${Object.keys(err.keyValue)} found`;
        err = new ErrorHandler(message,400);
    }


    if(err.name === "JsonWebTokenError"){
        const message =`Json Web token is invalid ,Try again`;
        err = new ErrorHandler(message,400);
    }
    
    
    if(err.name === "TokenExpiredError"){
        const message =`Json Web token is expired,Try again`;
        err = new ErrorHandler(message,400);
    }
    





    res.status(err.statusCode).json({ 
        success: false,
        // error: err.stack,               //stack is basically give the errors exact location
        message:err.message,
    });
};


//now import this in application.js
