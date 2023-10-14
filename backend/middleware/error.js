// we use error handler coz when we use this our server will not close if there is a error
const ErrorHandler = require("../utils/errorhandler");


module.exports = (err, req, res, next) => {     //its is a format or rest api mean err, request, response ,next
    err.statusCode = err.statusCode || 500;      //err means it will show error.status code or 500 if statuscode is not given 
    err.message = err.message || "Internal Server Error";  ////err means it will show error.message or internl sver eer if message is not given 


    //wrong mongodb id error
    //wrong error id error or short id error/coz catch asyncerror.
    
    if(err.name === "CastError"){
        const message =` Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    
    res.status(err.statusCode).json({   //in response of err.statuscode send this below
        success: false,
        // error: err.stack,  //stack is basically give the errors exact location
        message:err.message,
    });
};

//now import this in application.js
