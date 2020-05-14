module.exports = ({ controllers, helpers, db, authMD, passport, gates }) => {
  const route = require("express").Router();
  const { hospitals, auth, role, government, user, logs, errors } = controllers(
    {
      helpers,
      db,
      gates,
    }
  );

  (async () => {
    console.log(gates);
    // auth area
    route.post("/auth/login", auth.login);
    route.get(
      "/auth/facebook",
      passport.authenticate("facebook", {
        scope: "email",
      })
    );
    route.get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", {
        failureRedirect: "http://localhost:3000/panel/login",
        session: false,
      }),
      auth.facebookLogin
    );

    route.get(
      "/auth/google",
      passport.authenticate("google", {
        scope: "email",
      })
    );

    route.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/panel/login",
        session: false,
      }),
      auth.googleLogin
    );

    route.post("/auth", await authMD("admins"), (req, res) => {
      console.log(req.headers["token"]);
      res.status(200).json({
        message: "valid",
      });
    });

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
    route.get("/user", await authMD("admins"), user.index);
    route.get("/user/:id", await authMD("superuser"), user.find);
    route.post("/user", await authMD("superuser"), user.create);
    route.patch("/user", await authMD("superuser"), user.update);
    route.delete("/user", await authMD("superuser"), user.delete);

    // logs area
    route.get("/logs", await authMD("admins"), logs.index);
    route.get("/logs/:id", await authMD("admins"), logs.find);
    route.delete("/logs", await authMD("admins"), logs.delete);

    // logs area
    route.get("/errors", await authMD("admins"), errors.index);
    route.get("/errors/:id", await authMD("admins"), errors.find);
    route.delete("/errors", await authMD("admins"), errors.delete);
  })().catch((e) => {
    console.log(e);
  });

  return route;
};
