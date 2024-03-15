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



// in this search feature this $or is added by me(now you can also search anything in description also i tried to add this feature by simple adding "||" this btween name and description but it doent work so need to enclose objects in array )

    search(){
        const keyword =this.queryStr.keyword ? {
            $or: [
                {name:
                {
                  $regex: this.queryStr.keyword,
                  $options: "i",
                }}
                ,
                {description:
                {
                  $regex: this.queryStr.keyword,
                  $options: "i",
                }}
              ]
            }
        :
        {};
        
        console.log(keyword);

        this.query =this.query.find({...keyword});
        //this keyword is also can be put in api controller  
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