// query: This is a variable or value that you want to assign to the query property.

//this.query explaination.
// In JavaScript, this refers to the object it belongs to. When working with APIs in JavaScript, this refers to the API object.
// For example:

// const user = {
//   name: "John",
//   greet: function() {
//     console.log(`Hello, I am ${this.name}!`); 
//   } 
// }

// user.greet(); // Hello, I am John!

class apifeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr=queryStr
    };

    search(){
        const keyword =this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i", 
            }
        }
        :
        {};
        
        console.log(keyword);

        this.query =this.query.find({...keyword});
        return this;

    }
    
    filter(){
        const queryStrcopy = {...this.queryStr};
        //removing some fields for category
        console.log(queryStrcopy);
        const removeFields = ["keyword", "page","limit"];

        removeFields.forEach((key) =>
            delete queryStrcopy[key]
            )
           
            // filter api

            console.log(queryStrcopy);

            let queryStr = JSON.stringify(queryStrcopy);
            queryStr =queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) => `$${key}`);

            this.query =this.query.find(JSON.parse(queryStr));

            console.log(queryStr);

            return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) ||1;

        const skip = resultPerPage *(currentPage - 1);

        this.query =this.query.limit(resultPerPage).skip(skip);
        return this;

    }
}


module.exports = apifeatures