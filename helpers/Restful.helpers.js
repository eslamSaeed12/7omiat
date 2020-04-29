module.exports = ({ type, msg }) => {
  try {
    const errors = {
      400: ($errs) => {
        return {
          code: 400,
          message: "bad gateway",
          errors: $errs,
        };
      },
      404: ($errs) => {
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
        return {
          code: 200,
          message: "ok",
          data,
        };
      },
      201: (data) => {
        return {
          code: 200,
          message: "Created",
          data,
        };
      },
      302: (data) => {
        return {
          code: 200,
          message: "Found",
          data,
        };
      },
    };

    const typesEnum = [0, 1]; // 0 -> err, 1 -> success
    if (!typesEnum.includes(type)) throw new Error("type is wrong, not exist");

    if (type) {
      if (!success[msg]) throw new Error("msg is not exist");
      return success[msg];
    } else {
      if (!errors[msg]) throw new Error("msg is not exist");
      return errors[msg];
    }
  } catch (e) {
    console.log(e);
  }
};
