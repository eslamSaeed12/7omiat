const joi = require("joi");

const userSchemaNew = joi.object({
  username: joi.string().required().min(4).max(18),
  email: joi.string().email().required().max(255),
  password: joi.string().required().min(8).max(18),
  role_id: joi.number().integer().required(),
});

const userSchemaUpdate = joi.object({
  username: joi.string().required().min(4).max(18),
  email: joi.string().email().required().max(255),
  role_id: joi.number().integer().required(),
});

module.exports = (isNew = true, { username, email, password, role_id }) => {
  if (!isNew) {
    return userSchemaUpdate.validate({ username, email, role_id });
  }
  return userSchemaNew.validate({
    username,
    email,
    password,
    role_id,
  });
};
