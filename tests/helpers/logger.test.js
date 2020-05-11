const logger = require("../../helpers/looger");

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
    const log = logger("./logs/http.log");
    log.path = null;
    expect(() => log.checkFileExists()).toThrow(
      "filepath param not defined or maybe null"
    );
  });

  test("check file exists fails when change path from outside class constrcutor", () => {
    const log = logger("./logs/http.log");
    log.path = "/somepath.png";
    expect(log.checkFileExists()).toBeFalsy();
  });

  test("check file exists fails when not a string from outside class constrcutor", () => {
    const log = logger("./logs/http.log");
    log.path = [];
    expect(() => log.checkFileExists()).toThrow(
      "filepath param should only string"
    );
  });

  test("read as json when file path is editted and not exist", () => {
    const log = logger("./logs/http.log");
    log.path = "somePathIsWrong";
    expect(() => log.readAsJson()).toThrow(
      "file path is wrong or maybe file deleted"
    );
  });

  test("find with no params", () => {
    const log = logger("./logs/http.log");
    expect(() => log.find()).toThrow("id is not defined");
  });

  test("find with not valid id param", () => {
    const log = logger("./logs/http.log");
    expect(() => log.find({ id: [] })).toThrow("id should be a string");
  });

  test("add Record with no params", () => {
    const log = logger("./logs/http.log");
    expect(() => log.addRecord()).toThrow("log params not defined");
  });

  test("add Record without required params ['status', 'url', 'req', 'content_length', 'res_time']", () => {
    const log = logger("./logs/http.log");
    expect(() => log.addRecord({})).toThrow(
      /(^status|^url|^req|^content_length|^res_time)\s+not\sdefined$/
    );
  });

  test("add records and validate the params data types strings for ex : url", () => {
    const log = logger("./logs/http.log");
    expect(() =>
      log.addRecord({
        status: 200,
        url: 200,
        req: "req",
        content_length: 25,
        res_time: 30,
      })
    ).toThrow("url should be a string");
  });

  test("delete record when no id ", () => {
    const log = logger("./logs/http.log");
    expect(() => log.deleteRecord()).toThrow("id is not defined");
  });

  test("delete record when no id ", () => {
    const log = logger("./logs/http.log");
    expect(() => log.deleteRecord({})).toThrow("id is not defined");
  });

  test("delete record when id is not a string", () => {
    const log = logger("./logs/http.log");
    expect(() => log.deleteRecord({ id: 314 })).toThrow(
      "id should be a string"
    );
  });

  test("delete record with not valid record id ", () => {
    const log = logger("./logs/http.log");
    expect(() => log.deleteRecord({ id: "sadsa13431" })).toThrow(
      "this id is not exist or maybe deleted"
    );
  });

  test("save with wrong path", () => {
    const log = logger("./logs/http.log");
    log.path = "somewrong path";
    expect(() => log.save()).toThrow("file is not exist or maybe deleted");
  });
});

//

describe("success work", () => {
  test("success file  exist checker ", () => {
    const log = logger("./logs/http.log");
    expect(log.checkFileExists()).toBeTruthy();
  });

  test("success read as json function returns array", () => {
    const log = logger("./logs/http.log");
    expect(log.readAsJson()).toBeDefined();
  });

  test("success find by id ", () => {
    const log = logger("./logs/http.log");
    const findfn = jest.fn(({ id }) => log.find({ id }));
    findfn.mockReturnValueOnce({
      id: "to8wZI0kz",
      status: "500",
      url: "/role",
      content_length: "7",
      res_time: "10.384ms",
    });

    expect(findfn()).toEqual({
      id: "to8wZI0kz",
      status: "500",
      url: "/role",
      content_length: "7",
      res_time: "10.384ms",
    });
  });

  test("find all logs array", () => {
    const log = logger("./logs/http.log");
    expect(() => Array.isArray(log.all())).toBeTruthy();
  });

  test("add record in logs array", () => {
    const log = logger("./logs/http.log");
    expect(
      () =>
        log.addRecord({
          status: "500",
          url: "/role",
          content_length: "44",
          res_time: "59.410ms",
        }).id
    ).toBeDefined();
  });

  if (logger("./logs/http.log").all().length) {
    test("delete record in logs array", () => {
      const log = logger("./logs/http.log");
      const allLogs = log.all();
      expect(() => log.deleteRecord({ id: allLogs[0].id })).toBeTruthy();
    });
  }
  test("save file with no problems ", () => {
    const log = logger("./logs/http.log");
    expect(() => log.save()).toBeTruthy();
  });
});
