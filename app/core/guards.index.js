module.exports = (guard) => {
  try {
    const guards = {
      superuser: require("./guards/super.guard"),
      moderator: require("./guards/moderator.guard"),
      admins: require("./guards/admins.guard"),
    };
    if (!guards[guard]) {
      throw new Error("this guard is not exist");
    }
    return guards[guard];
  } catch (e) {
    console.log(e);
  }
};
