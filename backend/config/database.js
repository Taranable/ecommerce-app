const mongoose =require("mongoose");                    //install mongoose import mongoose


//here we connect mongoose to server
//it is a syntax - giving the mongobd://hostname:portname(check this by running mongoose on node)/folder name to create db,
//then 3 objects to make it true ratoo
//then make a promise in .then write console.log to check the server is running or not and catch to check for err.
//here mongoose.connect("mongodb://localhost:27017/ecommerce", in first line this host name is changed when we host on cloud 
// so in place of this write process.env.Db_url
// and in config.env folder give the url of this address in db_url
// and put all this connect function in 1 function


const connectDatabase= ()=>{
    mongoose.connect(process.env.Db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true it is deprecated and not in use so omit it
      }).then((data) => {
        console.log(`MongoDB connected to the server: ${data.connection.host}`);
      });
      
}


module.exports = connectDatabase;  //database exported and imported in Server.js











// Here's a breakdown of the code:

// mongoose.connect(...): This method is used to establish a connection to a MongoDB database. It takes a MongoDB connection string as its first parameter and an options object as the second parameter.

// The connection string "mongo://localhost:27017/ecommerce" specifies the MongoDB server's address (localhost) and port (27017), along with the database name (ecommerce) you want to connect to.

// The options provided in the options object include useNewUrlParser, useUnifiedTopology, and useCreateIndex. These are Mongoose-specific options:

// useNewUrlParser: This option is used to parse the MongoDB connection string using the new parser. It's necessary to provide this option to avoid deprecation warnings.

// useUnifiedTopology: This option uses the new unified topology engine for managing connections, which replaces the older Server Discovery and Monitoring engine.

// useCreateIndex: This option allows Mongoose to use the createIndex() function to define and create indexes in MongoDB.

// The .then() method is used to handle the Promise that mongoose.connect() returns. If the connection is successful, the callback function inside .then() is executed, and you log a message indicating that the MongoDB server is connected.



// Make sure you have the mongoose package installed (npm install mongoose) and that you've got a running MongoDB server on localhost with the default port 27017 before running this code. Also, the connection URL should be mongodb://localhost:27017/ecommerce, not "mongo://localhost:27017/ecommerce".

