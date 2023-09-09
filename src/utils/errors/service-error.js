const {StatusCodes}= require("http-status-codes");

class ServiceError extends Error{
    constructor(
        message="Something Went Wrong",
        description="Error in Service Layer",
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name= "ServiceError";
        this.message=message;
        this.description=description;
        this.statusCode=statusCode;
    }
}

module.exports= ServiceError;