module.exports = ({ controllers, helpers, db, authMD }) => {
  const route = require("express").Router();
  const { hospitals, auth, role, government } = controllers({ helpers, db });

  (async () => {
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

    // hospitals
    route.get("/hospitals", await authMD("admins"), hospitals.index);
    route.get("/hospitals/:id", await authMD("admins"), hospitals.find);
    route.post("/hospitals", await authMD("admins"), hospitals.create);
    route.patch("/hospitals", await authMD("admins"), hospitals.update);
    route.delete("/hospitals", await authMD("admins"), hospitals.delete);

    // users area
  })().catch((e) => {
    console.log(e);
  });

  return route;
};