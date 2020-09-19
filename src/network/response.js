const statusCode = {
  200: "Ok",
  201: "Created",
  204: "No content",
  304: "Not modified",
  400: "Bad request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
  500: "Internal server error",
};

exports.success = (req, res, message, status = 200) => {
  let statusMessage = "";
  if (!message || message === "") {
    statusMessage = statusCode[status];
  }

  res.status(status).send({
    error: "",
    content: statusMessage || message,
  });
};

exports.error = (req, res, error, status = 500, message) => {
  let statusMessage = "";
  if (!message || message === "") {
    statusMessage = statusCode[status];
  }
  res.status(status).send({
    error: error,
    content: statusMessage || message,
  });
};
