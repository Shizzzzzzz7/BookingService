const { Booking }= require("../models/index");
const { ValidationError, AppError }= require("../utils/errors/index");
const { StatusCodes }= require("http-status-codes");

class BookingRepository{

    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;

        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                throw new ValidationError(error);
            }

            throw new AppError(
                "RepositoryError",
                "Cannot Create Booking",
                "There was some issue in creating the booking. Try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(bookingId, data){
        try {
            await Booking.update(data, {
                where: {
                    id: bookingId
                }
            });

            const booking = await Booking.findByPk(bookingId);
            return booking;
        } catch (error) {
            if(error.name === "SequelizeValidationError"){
                throw new ValidationError(error);
            }

            throw new AppError(
                "RepositoryError",
                "Cannot Create Booking",
                "There was some issue in creating the booking. Try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;