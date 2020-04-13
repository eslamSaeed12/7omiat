const joi = require("joi");

const hospitalSchema = joi.object({
  name: joi.string().required().max(255).min(8),
  telephone: joi.string().length(9).required(),
  fullDescription: joi.string().required().max(255).min(8),
  coords: joi
    .object()
    .keys({
      type: joi.string(),
      coordinates: joi.array().items([joi.number().required(), joi.number().required()]).length(2),
    })
    .required(),
  gov_id: joi.number().integer().required(),
});

module.exports = ({ name, telephone, fullDescription, coords, gov_id }) => {
  return hospitalSchema.validate({
    name,
    telephone,
    fullDescription,
    coords,
    gov_id,
  });
};
