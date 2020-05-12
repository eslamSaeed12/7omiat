const policies = require("./policies.container");
const abstractGate = require("./gates/abstract.Gates");

module.exports = new abstractGate({ ...policies });
