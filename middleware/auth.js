const jwt = require("jsonwebtoken"),
  Config = require("../config/config");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "You are not authenticated!",
      });
    }
    req.isAuth = true;
    next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
