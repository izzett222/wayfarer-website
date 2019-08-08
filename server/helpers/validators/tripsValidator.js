import {Joi} from "celebrate";
export const postTrip = (trip)=>{
  const schema = {
    seating_capacity:Joi.number().required(),
    bus_license_number:Joi.string().max(9),
    origin:Joi.string().required().min(4),
    destination:Joi.string().required().min(4),
    fare:Joi.number().required()
}
return Joi.validate(trip, schema);
}

export const cancelValidation = (trip) => {
  const schema = {
      status:Joi.string().valid("active", "cancelled").required()
  }
  return Joi.validate(trip, schema);
}