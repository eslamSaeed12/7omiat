module.exports = ({ controllers, helpers, db, authMD, passport }) => {
  const route = require("express").Router();
  const { hospitals, auth, role, government, user } = controllers({
    helpers,
    db,
  });

  (async () => {
    // auth area
    route.get("/auth/token", auth.csrf);
    route.post("/auth/login", auth.login);
    route.get(
      "/auth/facebook",
      passport.authenticate("facebook", { scope: "email" })
    );
    route.get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", {
        failureRedirect: "/login",
        session: false,
      }),
      auth.facebookLogin
    );

    route.get(
      "/auth/google",
      passport.authenticate("google", { scope: "email" })
    );

    route.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
      }),
      auth.googleLogin
    );

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
    route.get("/user", await authMD("superuser"), user.index);
    route.get("/user/:id", await authMD("superuser"), user.find);
    route.post("/user", await authMD("superuser"), user.create);
    route.patch("/user", await authMD("superuser"), user.update);
    route.delete("/user", await authMD("superuser"), user.delete);
  })().catch((e) => {
    console.log(e);
  });

  return route;
};
