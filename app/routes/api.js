module.exports = ({ controllers, helpers, db, authMD }) => {
  const route = require("express").Router();
  const { hospitals, auth, role } = controllers({ helpers, db });

  (async () => {
    //route.get("/hold", await authMD("moderator"), hospitals.index);

    route.post("/login", auth.login);

    // roles area
    route.get("/role", await authMD("superuser"), role.index);
    route.get("/role/:id", role.find);
    route.post("/role", role.create);
    route.patch("/role", role.update);
    route.delete("/role", role.delete);

    
  })().catch((e) => {
    console.log(e);
  });

  return route;
};
