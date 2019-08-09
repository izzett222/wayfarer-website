import { Joi } from "celebrate";
export const postTrip = trip => {
  const schema = {
    seating_capacity: Joi.number()
      .required()
      .min(5)
      .max(100),
    bus_license_number: Joi.string().max(9),
    origin: Joi.string()
      .required()
      .min(4)
      .max(50),
    destination: Joi.string()
      .required()
      .min(4)
      .max(50),
    fare: Joi.number()
      .required()
      .min(1)
      .max(500000),
    trip_date: Joi.date()
      .min("now")
      .iso()
      .required()
  };
  return Joi.validate(trip, schema);
};

export const cancelValidation = trip => {
  const schema = {
    status: Joi.string()
      .valid("active", "cancelled")
      .required()
  };
  return Joi.validate(trip, schema);
};
