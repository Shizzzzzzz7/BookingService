const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } =require("../utils/messageQueue");
const { REMAINDER_BINDING_KEY } = require("../config/serverConfig")

const bookingService = new BookingService();

class BookingController{
    constructor(){

    }

    async sendMessageToQueue(req,res){
        try {
            const channel = await createChannel();
            const data = {message:"Success"};
            publishMessage(channel, REMAINDER_BINDING_KEY, JSON.stringify(data));
            return res.status(200).json({
                message:"Succesfully sent"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:"Unsuccesfully"
            });
        }
    }

    async createBooking(req,res){

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
}

module.exports= BookingController;