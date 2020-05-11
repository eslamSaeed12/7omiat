const logger = require("../../helpers/errorLogger");

describe("logger fails", () => {
  test("no file path exception", () => {
    expect(() => logger()).toThrow("filepath param not defined");
  });

  test("file path not valid string", () => {
    expect(() => logger([] || {})).toThrow("filepath param should only string");
  });

  test("check file exists fails when not exist", () => {
    expect(() => logger("../../logs/savag.log")).toThrow(
      "file path is wrong or maybe file deleted"
    );
  });

  test("check file exists fails when change path from outside class constrcutor and no path", () => {
    const log = logger("./logs/error.log");
    log.path = null;
    expect(() => log.checkFileExists()).toThrow(
      "filepath param not defined or maybe null"
    );
  });

  test("check file exists fails when change path from outside class constrcutor", () => {
    const log = logger("./logs/error.log");
    log.path = "/somepath.png";
    expect(log.checkFileExists()).toBeFalsy();
  });

  test("check file exists fails when not a string from outside class constrcutor", () => {
    const log = logger("./logs/error.log");
    log.path = [];
    expect(() => log.checkFileExists()).toThrow(
      "filepath param should only string"
    );
  });

  test("read as json when file path is editted and not exist", () => {
    const log = logger("./logs/error.log");
    log.path = "somePathIsWrong";
    expect(() => log.readAsJson()).toThrow(
      "file path is wrong or maybe file deleted"
    );
  });

  test("find with no params", () => {
    const log = logger("./logs/error.log");
    expect(() => log.find()).toThrow("id is not defined");
  });

  test("find with not valid id param", () => {
    const log = logger("./logs/error.log");
    expect(() => log.find({ id: [] })).toThrow("id should be a string");
  });

  test("add Record with no params", () => {
    const log = logger("./logs/error.log");
    expect(() => log.addRecord()).toThrow("log params not defined");
  });

  test("add Record without required params [message, name, stack]", () => {
    const log = logger("./logs/error.log");
    expect(() => log.addRecord({})).toThrow(
      /(^message|^name|^stack)\s+not\sdefined$/
    );
  });

  test("add records and validate the params data types strings for ex : message", () => {
    const log = logger("./logs/error.log");
    expect(() =>
      log.addRecord({
        message: 13413413,
        name: "error",
        stack: "some stack is tested",
      })
    ).toThrow("message should be a string");
  });

  test("delete record when no id ", () => {
    const log = logger("./logs/error.log");
    expect(() => log.deleteRecord()).toThrow("id is not defined");
  });

  test("delete record when no id ", () => {
    const log = logger("./logs/error.log");
    expect(() => log.deleteRecord({})).toThrow("id is not defined");
  });

  test("delete record when id is not a string", () => {
    const log = logger("./logs/error.log");
    expect(() => log.deleteRecord({ id: 314 })).toThrow(
      "id should be a string"
    );
  });

  test("delete record with not valid record id ", () => {
    const log = logger("./logs/error.log");
    expect(() => log.deleteRecord({ id: "sadsa13431" })).toThrow(
      "this id is not exist or maybe deleted"
    );
  });

  test("save with wrong path", () => {
    const log = logger("./logs/error.log");
    log.path = "somewrong path";
    expect(() => log.save()).toThrow("file is not exist or maybe deleted");
  });
});

//

describe("success work", () => {
  test("success file  exist checker ", () => {
    const log = logger("./logs/error.log");
    expect(log.checkFileExists()).toBeTruthy();
  });

  test("success read as json function returns array", () => {
    const log = logger("./logs/error.log");
    expect(log.readAsJson()).toBeDefined();
  });

  test("success find by id ", () => {
    const log = logger("./logs/error.log");
    const findfn = jest.fn(({ id }) => log.find({ id }));
    findfn.mockReturnValueOnce({
      id: "it01MQ6cf",
      timestamp: 1588293887414,
      message: "undeifned token",
      name: "Error",
      stack:
        "Error: undeifned token\n    at D:\\Projects\\7omiat\\app\\middlewares\\auth.js:13:15\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at Function.handle (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:174:3)\n    at router (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:317:13)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:284:7\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at initialize (D:\\Projects\\7omiat\\node_modules\\passport\\lib\\middleware\\initialize.js:53:5)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:317:13)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:284:7\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at requestid (D:\\Projects\\7omiat\\node_modules\\connect-rid\\lib\\connect-rid.js:27:5)",
    });

    expect(findfn()).toEqual({
      id: "it01MQ6cf",
      timestamp: 1588293887414,
      message: "undeifned token",
      name: "Error",
      stack:
        "Error: undeifned token\n    at D:\\Projects\\7omiat\\app\\middlewares\\auth.js:13:15\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at Function.handle (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:174:3)\n    at router (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:317:13)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:284:7\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at initialize (D:\\Projects\\7omiat\\node_modules\\passport\\lib\\middleware\\initialize.js:53:5)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:317:13)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:284:7\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at requestid (D:\\Projects\\7omiat\\node_modules\\connect-rid\\lib\\connect-rid.js:27:5)",
    });
  });

  test("find all logs array", () => {
    const log = logger("./logs/error.log");
    expect(() => Array.isArray(log.all())).toBeTruthy();
  });

  test("add record in logs array", () => {
    const log = logger("./logs/error.log");
    expect(
      () =>
        log.addRecord({
          message: "undeifned token",
          name: "Error",
          stack:
            "Error: undeifned token\n    at D:\\Projects\\7omiat\\app\\middlewares\\auth.js:13:15\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\route.js:137:13)\n    at Route.dispatch (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\route.js:112:3)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:281:22\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at Function.handle (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:174:3)\n    at router (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:47:12)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:317:13)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:284:7\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at initialize (D:\\Projects\\7omiat\\node_modules\\passport\\lib\\middleware\\initialize.js:53:5)\n    at Layer.handle [as handle_request] (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at trim_prefix (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:317:13)\n    at D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:284:7\n    at Function.process_params (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:335:12)\n    at next (D:\\Projects\\7omiat\\node_modules\\express\\lib\\router\\index.js:275:10)\n    at requestid (D:\\Projects\\7omiat\\node_modules\\connect-rid\\lib\\connect-rid.js:27:5)",
        }).id
    ).toBeDefined();
  });

  if (logger("./logs/error.log").all().length) {
    test("delete record in logs array", () => {
      const log = logger("./logs/error.log");
      const allLogs = log.all();
      expect(() => log.deleteRecord({ id: allLogs[0].id })).toBeTruthy();
    });
  }
  test("save file with no problems ", () => {
    const log = logger("./logs/error.log");
    expect(() => log.save()).toBeTruthy();
  });
});
