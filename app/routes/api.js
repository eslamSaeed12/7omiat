module.exports = ({ controllers, helpers, db, authMD }) => {
  const route = require("express").Router();
  const { hospitals, auth, role, government } = controllers({ helpers, db });

  (async () => {
    //route.get("/hold", await authMD("moderator"), hospitals.index);

    route.post("/login", auth.login);

    // roles area
    route.get("/role", await authMD("admins"), role.index);
    route.get("/role/:id", await authMD("admins"), role.find);
    route.post("/role", await authMD("superuser"), role.create);
    route.patch("/role", await authMD("superuser"), role.update);
    route.delete("/role", await authMD("superuser"), role.delete);

    // governments area
    route.get("/gov", await authMD("admins"), government.index);
    route.get("/gov/:id", await authMD("admins"), government.find);
    route.post("/gov", await authMD("admins"), government.create);
    route.patch("/gov", await authMD("admins"), government.update);
    route.delete("/gov", await authMD("admins"), government.delete);
    
  })().catch((e) => {
    console.log(e);
  });

  return route;
};
