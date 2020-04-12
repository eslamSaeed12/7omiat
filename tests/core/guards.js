const superguard = require("../../app/core/guards/super.guard");
const { user } = require("../../models/index");
const jwt = require("../../helpers/jwt");
const dotenv = require("../../helpers/dotenv");
(async () => {
  const id = "f0ec6ab0-7cb2-11ea-bb3a-5bfbdb0509db";
  const jwtEncoded = jwt.encode({ id }, dotenv("secret"));
  const decoded = jwt.decode(jwtEncoded + "sd", dotenv("secret"));
  console.log(decoded);
})().catch((e) => console.log(e));
