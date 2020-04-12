const striper = require("striptags");
class sanitizer {
  $str(str) {
    try {
      if (!str) throw new Error("str param is missing !");
      if (typeof str !== "string")
        throw new Error("str param should only string");

      return striper(str);
    } catch (e) {
      console.log(e);
    }
  }

  $int(int) {
    try {
      if (!str) throw new Error("str param is missing !");
      if (!Number.isInteger(int))
        throw new Error("int param should only integer");
      return Number.parseInt(this.$str(int));
    } catch (e) {
      console.log(e);
    }
  }

  $float(float) {
    try {
      if (!float) throw new Error("float param is missing !");
      if (typeof float !== "number")
        throw new Error("int param should only number");
      return Number.parseFloat(this.$str(int));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new sanitizer();
