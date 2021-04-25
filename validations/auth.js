const Joi = require('joi');

exports.signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};
