module.exports = ({ controllers, helpers, db, authMD }) => {
  const route = require("express").Router();
  const { hospitals, auth } = controllers({ helpers, db });

  (async () => {



    route.get("/hold", await authMD("moderator"), hospitals.index);
    route.post("/login", auth.login);



  })();

  return route;
};
