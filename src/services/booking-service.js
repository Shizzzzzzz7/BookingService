const axios = require("axios");
const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors/index");
const { StatusCodes } = require("http-status-codes");

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId= data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flightDetails = await axios.get(getFlightRequestURL);
            const flight = flightDetails.data.data;
            if(data.noOfSeats > flight.totalSeats){
                throw new ServiceError(
                    "Something Went Wrong in the BookigService Layer",
                    "Insufficient number of seats",
                    StatusCodes.INTERNAL_SERVER_ERROR
                    );
            }
            const totalCost = data.noOfSeats * flight.price;
            data = {...data, totalCost};
            const booking = await this.bookingRepository.create(data);
            const flightDetailsUpdateURL= `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            await axios.patch(flightDetailsUpdateURL, {totalSeats: flight.totalSeats - data.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});
            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name === "ValidatinError" || error.name === "SequelizeValidationError"){
                throw error;
            }
            throw new ServiceError();
        }
    }
}
module.exports = BookingService;