const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const ApiError = require("../utils/ApiError");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    // NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string()
      .default("/api/v1")
      .required()
      .description("Base url is mandatory"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new ApiError(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
};
