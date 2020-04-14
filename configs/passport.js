const passport = require("passport");
const facebookST = require("passport-facebook").Strategy;
const faceOauthConfig = require("./passport/facebook.oauth.json");

const googleSt = require("passport-google-oauth20").Strategy;
const googleOauthConfig = require("./passport/google.oauth.json");

module.exports = ({ user }) => {
  passport.use(
    new facebookST(
      faceOauthConfig,
      async (accessToken, refreshToken, profile, done) => {
        const { emails } = profile;
        const userInstance = await user.findOne({
          where: { email: emails[0].value || "" },
          include: "role",
        });

        if (userInstance) {
          return done(false, userInstance);
        }
        return done(true, null);
      }
    )
  );

  passport.use(
    new googleSt(
      googleOauthConfig,
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        const { emails } = profile;
        const userInstance = await user.findOne({
          where: { email: emails[0].value || "" },
          include: "role",
        });

        if (userInstance) {
          return done(false, userInstance);
        }
        return done(true, null);
      }
    )
  );

  return passport;
};
