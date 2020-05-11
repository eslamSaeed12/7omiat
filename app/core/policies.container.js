const abstractPolicy = require("./policies/abstract.policies");



// declare policies here 

module.exports = new abstractPolicy({

  createUsers({ user }) {
    if (user === "islam") {
      return true;
    }
  },
  
});
