import {bookings} from "../models/bookings";
// import {postTrip, cancelValidation} from "..//validators/tripsValidator"
import {validatebooking} from "../helpers/validators/bookingValidator";
export default class BookingControl{
  static  allBookings(req, res, next){
    return res.status(200).json({status:200,data:bookings});
   }

    static book(req, res, next){
    const {error} = validatebooking(req.body);
    if(error) {return res.status(400).json({status:400,error:error.details[0].message})};
    const yourBookings = bookings.filter(c =>{return c.user_id === req.user.id})
    const booking = yourBookings.find(c=>{return c.trip_id === req.body.trip_id})
    if(booking){
       return res.status(400).json({
           status:400,
            error:"you already booked this trip"
        })
    }
    const trip = trips.find(c => c.trip_id === req.body.trip_id);
    if(!trip)return res.status(404).json({status:400,error:"the trip you are booking on doesnt exist"});
    if(trip.status === "cancelled")return res.status(400).json({status:400,error:"the trip is cancelled"});
    const newBook = {
        id:bookings.length +1,
        trip_id:req.body.trip_id,
        user_id:req.user.user_id,
        created_on:new Date().toDateString()
    }

    bookings.push(newBook)
    res.status(201).json({status:201,data:newBook})

}
static userBookings(req,res,next){
  if(req.user.user_id !== parseInt(req.params.user_id)){
      res.status(400).json({
          status:400,
          data:"you can't view other users bookings"
      })
  }
  const myBookings = bookings.filter(c=> c.user_id === parseInt(req.params.user_id))
  if(myBookings.length <1)return res.status(404).json({status:400,data:"you have no bookings"}) 
  res.status.json({
      status:200,
      data:myBookings
  })
}

static deleteBooking(req, res, next){
  const myBookings = bookings.filter(c=>{return c.user_id === parseInt(req.user.user_id)})
  const booking = myBookings.find(c=>{return c.id === parseInt(req.params.id)})
  if(!booking)return res.status(400).json({status:400,error:"booking doesnt exist"});
  if(booking.user_id !== req.user.user_id){
      return res.status(400).json({status:400,error:"this is not your booking"})
  }
  const index = bookings.findIndex(c=>{return c.id === parseInt(req.params.id)});
  bookings.splice(index, 1);
  res.status(200).json({status:200,data:"booking deleted successfully"});
}

}