// OOPS ;-

//here we make or extend the prebuild class in js thatis error.
// classes()-it is like template and u use it for many users 
// __proto__ - used to give the value of one method to another
// constructer() - it is printed default
// extends - it extends the class or to inheritance the class(class child extends parent).
// method overwriting- to overwrite a method in child that is defined in parent
// super - used when u extend the class and u want some property of parent class in child class,
// this error class more info learn from google
// more in js notes handwritten oops



class Errorhandler extends Error{
    constructor(message,statusCode){
        super(message);    // it means calling the superclass/parent constructor
        this.statusCode= statusCode        //this.a=statuscode and statuscode is the parameter in constructor// This line initializes the statuscode property of the errorhandler instance with the value passed as the statuscpde argument to the errorhandler constructor.
        
        Error.captureStackTrace(this,this.constructor); // its is a method in Error// is used to capture a stack trace for the error object being created. This can be useful for debugging purposes to understand where the error was thrown in your code.

    }
    

}
  
module.exports=Errorhandler



// super(message) calls the constructor of the parent class (Error) with the message argument.
// this.statusCode = statusCode; initializes the statusCode property of the Errorhandler instance.
// Error.captureStackTrace(this, this.constructor); captures the stack trace of the error object.