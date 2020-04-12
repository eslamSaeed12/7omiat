module.exports = (winston) => {
  return {
    http: {
      level: "http",
      format: winston.format.json({ space: true, replacer: "," }),
      transports: [
        new winston.transports.File({ filename: "../logs/http.json" }),
      ],
    },
    error: {
      level: "error",
      format: winston.format.json({ space: true, replacer: "," }),
      transports: [
        new winston.transports.File({ filename: "../logs/error.json" }),
      ],
    },
  };
};
