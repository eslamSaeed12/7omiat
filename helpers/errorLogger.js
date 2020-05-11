const fs = require("fs");
class loggerProvider {
  constructor(filepath) {
    if (!filepath) throw Error("filepath param not defined");
    if (typeof filepath !== "string")
      throw Error("filepath param should only string");

    this.path = filepath;
    this.fs = fs;
    this.IDGenerator = require("shortid");
    if (!this.checkFileExists())
      throw Error("file path is wrong or maybe file deleted");
    this.logs = this.readAsJson();
  }

  checkFileExists() {
    if (!this.path) throw Error("filepath param not defined or maybe null");
    if (typeof this.path !== "string")
      throw Error("filepath param should only string");

    return this.fs.existsSync(this.path);
  }

  readAsJson() {
    if (!this.checkFileExists())
      throw Error("file path is wrong or maybe file deleted");

    return JSON.parse(this.fs.readFileSync(this.path, "utf8"));
  }

  addRecord(paramObject) {
    if (!paramObject) throw Error("log params not defined");
    const { message, name, stack } = paramObject;
    const required = ["message", "name", "stack"];

    const stringValidate = [required[0], required[1], required[2]];

    required.forEach((i) => {
      if (!paramObject[i]) throw Error(`${i} not defined`);
    });

    stringValidate.forEach((i) => {
      if (typeof paramObject[i] !== "string")
        throw Error(`${i} should be a string`);
    });

    const unqiueId = this.IDGenerator.generate();

    const newLog = this.logs.push({
      id: unqiueId,
      timestamp: Date.now(),
      message,
      name,
      stack,
    });
    this.save();

    return this.logs[newLog - 1];
  }

  find(obj = { id }) {
    const { id } = obj;
    if (!id) throw Error("id is not defined");
    if (typeof id !== "string") throw Error("id should be a string");
    return this.logs.find((log) => log.id === id);
  }

  all() {
    return this.logs;
  }

  deleteRecord(obj = { id }) {
    const { id } = obj;
    if (!id) throw Error("id is not defined");
    if (typeof id !== "string") throw Error("id should be a string");
    const record = this.logs.find((log) => log.id === id);
    if (!record) throw Error("this id is not exist or maybe deleted");

    this.logs.forEach((record, index) => {
      if (record.id && record.id === id) {
        this.logs.splice(index, 1);
      }
    });
    this.save();
  }

  save() {
    if (!this.checkFileExists())
      throw Error("file is not exist or maybe deleted");

    const fd = this.fs.openSync(this.path);
    this.fs.writeFileSync(this.path, JSON.stringify(this.logs), {
      encoding: "utf8",
    });
    this.fs.closeSync(fd);
  }
}

module.exports = (fileLogPath) => {
  return new loggerProvider(fileLogPath);
};
