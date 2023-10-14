const CatchAsyncError = (theFunc) => (req,res,next) =>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
};

module.exports = CatchAsyncError;

// console.log(youtube)


// CatchAsyncError is a function that takes another function theFunc as an argument. This theFunc is expected to be an asynchronous route handler.
// Inside CatchAsyncError, a new function is returned, which serves as the actual middleware that will be used in your Express routes.
// The returned middleware takes the standard (req, res, next) parameters, indicating it's an Express middleware function.
// Inside the middleware, theFunc(req, res, next) is called, which represents the asynchronous route handler you want to execute.
// The result of theFunc is a Promise, which is then chained with .catch(next) to catch any errors that might occur during its execution. If an error occurs, it will be passed to the Express error handling middleware (typically defined using app.use((err, req, res, next) => {...})).
// The wrapped middleware essentially ensures that you don't have to manually handle errors with try-catch blocks within each of your asynchronous route handlers. Instead, any errors will be automatically caught, and the error handling middleware will take care of them.