const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");

const bookingService = new BookingService();
const createBooking = async(req,res)=>{

    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            message: "Boooking Done Successfully",
            success: true,
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            message: error.explaination,
            success: false,
            error: error
        });
    }
}
module.exports= {
    createBooking
}