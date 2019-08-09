import { Joi } from "celebrate";
export const validateNewUser = user => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    first_name: Joi.string()
      .trim()
      .min(4)
      .required(),
    last_name: Joi.string()
      .trim()
      .min(4)
      .required(),
    password: Joi.string()
      .trim()
      .min(4)
      .required(),
    is_admin: Joi.boolean().strict()
  });
  return Joi.validate(user, schema);
};

export const validateLoggingUser = user => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .trim()
      .min(4)
      .required()
  });
  return Joi.validate(user, schema);
};
