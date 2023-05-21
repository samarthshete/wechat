 
import { StatusCodes } from "http-status-codes"; 
const errorHandlerMiddleware = (err, req, res, next) =>{
    console.log(err.message)
    //res.status(500).json({msg: 'there was an error'})
    const defaultError = {
        statusCode : err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || "Something went wrong, try again later",
    }
    if( err.name === "ValidationError"){
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        // defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    }
    //  Unique Field Error
    if(err.code && err.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique` 
    }
    //  res.status(defaultError.statusCode).json({msg: err})
    res.status(defaultError.statusCode).json({msg: defaultError.msg})
}

export default errorHandlerMiddleware;