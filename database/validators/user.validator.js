const joi = require("joi");

const userSchemaNew = joi.object({
  username: joi.string().required().min(4).max(18),
  email: joi.string().email().required().max(255),
  password: joi.string().required().min(8).max(22),
  role_id: joi.number().integer().required(),
  remember_me: joi.string().optional(),
});

const userSchemaUpdate = joi.object({
  username: joi.string().required().min(4).max(18),
  email: joi.string().email().required().max(255),
  role_id: joi.number().integer().required(),
  remember_me: joi.string().optional(),
});

module.exports = (
  isNew = true,
  { username, email, password, role_id, remember_me }
) => {
  if (!isNew) {
    return userSchemaUpdate.validate({ username, email, role_id, remember_me });
  }
  return userSchemaNew.validate({
    username,
    email,
    password,
    role_id,
    remember_me,
  });
};
