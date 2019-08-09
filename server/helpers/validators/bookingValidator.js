import { Joi } from "celebrate";
export const validatebooking = booking => {
  const schema = {
    trip_id: Joi.number().required()
  };
  return Joi.validate(booking, schema);
};