module.exports = function (obj = { type, msg }) {
  const { type, msg } = obj;

  if (!type && !msg) throw Error("type and msg are required");

  if (type === null || type === undefined || !String(type))
    throw Error("type is required");

  if (!msg) throw Error("msg is required");

  if (typeof type !== "number") throw Error("type should be a number");
  if (typeof msg !== "number") throw Error("msg should be a number");

  const errors = {
    400: ($errs) => {
      if (!$errs) throw Error("errors param is required");
      return {
        code: 400,
        message: "bad gateway",
        errors: $errs,
      };
    },
    404: ($errs) => {
      if (!$errs) throw Error("errors param is required");
      return {
        code: 404,
        message: "resource not found",
        error: $errs,
      };
    },
    401: {
      code: 401,
      message: "you dont have the permissions to be there",
    },
    403: ($errs) => {
      if (!$errs) throw Error("errors param is required");
      return {
        code: 403,
        message: "Forbidden",
        errors: $errs,
      };
    },
    500: {
      code: 500,
      message: "Internal Server Error",
    },
  };

  const success = {
    200: (data) => {
      if (!data) throw Error("data param is required");
      return {
        code: 200,
        message: "ok",
        data,
      };
    },
    201: (data) => {
      if (!data) throw Error("data param is required");
      return {
        code: 201,
        message: "Created",
        data,
      };
    },
    302: (data) => {
      if (!data) throw Error("data param is required");
      return {
        code: 302,
        message: "Found",
        data,
      };
    },
  };

  const typesEnum = [0, 1]; // 0 -> err, 1 -> success
  if (!typesEnum.includes(type)) throw Error("type is wrong, not exist");

  if (type) {
    if (!success[msg]) throw Error("msg is not exist");
    return success[msg];
  } else {
    if (!errors[msg]) throw Error("msg is not exist");
    return errors[msg];
  }
};
