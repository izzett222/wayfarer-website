import { bookings } from "../models/bookings";
import { trips } from "../models/trips";
import { validatebooking } from "../helpers/validators/bookingValidator";
export default class BookingControl {
  static allBookings(req, res, next) {
    if(bookings.length < 0) return res.status(404).json({status:400,error:"not bookings is available at the moment"})
    return res.status(200).json({ status: 200, data: bookings });
  }

  static book(req, res, next) {
    const { error } = validatebooking(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    const yourBookings = bookings.filter(c => {
      return c.user_id === parseInt(req.user.user_id);
    });
    const booking = yourBookings.find(c => {
      return c.trip_id === req.body.trip_id;
    });
    if (booking) {
      return res.status(400).json({
        status: 400,
        error: "you already booked this trip"
      });
    }
    const trip = trips.find(c => {return c.trip_id === req.body.trip_id});
    console.log(trip)
    console.log(req.body.trip_id)
    console.log(trips);
    if (!trip)
      return res
        .status(404)
        .json({
          status: 400,
          error: "the trip you are booking on doesnt exist"
        });
    if (trip.status === "cancelled")
      return res
        .status(400)
        .json({ status: 400, error: "the trip is cancelled" });
    const newBook = {
      id: bookings.length + 1,
      trip_id: req.body.trip_id,
      user_id: req.user.user_id,
      created_on: new Date().toDateString()
    };
    console.log(newBook);

    bookings.push(newBook);
    res.status(201).json({ status: 201, data: newBook });
  }
  static userBookings(req, res, next) {
    if (req.user.user_id !== parseInt(req.params.user_id)) {
      res.status(400).json({
        status: 400,
        data: "you can't view other users bookings"
      });
    }
    const myBookings = bookings.filter(
      c => c.user_id === parseInt(req.params.user_id)
    );
    if (myBookings.length < 1)
      return res
        .status(404)
        .json({ status: 400, data: "you have no bookings" });

    res.status(200).json({
      status: 200,
      data: myBookings
    });
  }

  static deleteBooking(req, res, next) {
    const booking = bookings.find(c => {
      return c.id === parseInt(req.params.id);
    });
    console.log(booking);
    if (!booking)
      return res
        .status(404)
        .json({ status: 404, error: "booking doesnt exist" });
    console.log(req.user);
    if (booking.user_id !== req.user.user_id) {
      return res
        .status(400)
        .json({ status: 400, error: "this is not your booking" });
    }
    const index = bookings.findIndex(c => {
      return c.id === parseInt(req.params.id);
    });
    bookings.splice(index, 1);
    res.status(200).json({ status: 200, data: "booking deleted successfully" });
  }
}
