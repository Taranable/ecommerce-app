
process.on("uncaughtException", (err) => {
  console.log(`error:${err.message}`);
  console.log("shutting down the error due to uncaught exception");

  process.exit(1);
})
// here we make express server.
// it is used to start the server.js in node
// in package.json new key is also made name dev mean while development we use nodemon

const app = require("./app");
const dotenv = require("dotenv");                         // we have to install in node mpm i dotenv & import dotenv to use process.env.port
// const prt = process.env.PORT; --whwn i do this the port is undefined



const connectDatabase = require("./config/database");
//config
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();  // connecting to db and we call after config file coz if it is connected first then it show error

const server = app.listen(process.env.PORT, () => {                                      //process.env.port function in which  any port is available it will assign automatically to the server


  console.log(`server is working at http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection error:- resolve
// process.on("unhandledRejection", callbackfunction)
// Parameters: This method takes the following two parameters.
// unhandledRejection: It is the name of the emit event in the process.
// callbackfunction: It is the event handler of the event.

// it replace the use of catch in database so when error occur it will run

process.on("unhandledRejection", (err) => {  //https://www.geeksforgeeks.org/node-js-process-unhandledpromiserejection-event/
  console.log(`error: ${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");

  server.close(() => {   //it is a const variable server ,see above//with server.close our server is closed.
    process.exit(1);       //when server close this process is exit
  });
});


// The code snippet you provided is written in JavaScript and is utilizing the Node.js process object's on method to handle unhandled promise rejections. In Node.js, when a Promise is rejected but no .catch() or await is used to handle the rejection, it becomes an "unhandled promise rejection." This can lead to unexpected behavior in your application, and Node.js provides the unhandledRejection event to catch and handle these cases.
// Here's what the code does step by step:
// process.on("unhandledRejection", (err) => { ... }): This line sets up an event listener for the "unhandledRejection" event on the process object. When an unhandled promise rejection occurs in your application, the provided callback function will be invoked with the err parameter representing the error that caused the rejection.
// console.log(error: ${err.message});: This line logs the error message of the unhandled rejection to the console. The err.message property contains the description of the error.
// console.log("shutting down the error due to unhandled promise rejection");: This line logs a message indicating that the application is shutting down due to an unhandled promise rejection.
// Server.close(() => { ... }): This line seems to be calling the close method on a variable named Server. This suggests that you might have a server instance (e.g., created using the http or express module) stored in the Server variable. The purpose of this line is to attempt to gracefully close the server before shutting down the application.
// process.exit(1);: This line invokes the exit method on the process object to terminate the Node.js process. The argument 1 passed to the exit method indicates an error exit code. This suggests that the process is being terminated due to an error condition.