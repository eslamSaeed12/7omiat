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
      if (!int) throw new Error("int param is missing !");
      if (!Number.isInteger(int)) return 0;
      return Number.parseInt(int);
    } catch (e) {
      console.log(e);
    }
  }

  $float(float) {
    try {
      if (!float) throw new Error("float param is missing !");
      if (typeof float !== "number") return 0;
      return Number.parseFloat(float);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new sanitizer();
