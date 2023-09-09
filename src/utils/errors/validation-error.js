const {StatusCodes}= require("http-status-codes");

class ValidationError extends Error{
    constructor(error){
        let description=[];
        error.errors.forEach((err)=>{
            description.push(err.message);
        });
        super();
        this.name= "ValidatinError";
        this.message="Unable to Validate the sent Data";
        this.description=description;
        this.statusCode=StatusCodes.BAD_REQUEST;
    }
}

module.exports= ValidationError;