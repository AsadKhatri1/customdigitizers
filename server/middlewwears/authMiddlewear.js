const jwt = require("jsonwebtoken");
const Usermodel = require("../models/Usermodel");

// protected routes token base

// checking if user is loggedin using token
const requireSignIn = async (req, res, next) => {
  try {
    const decode = await jwt.verify(
      req.headers.authorization,
      process.env.jwt_secret
    );
    // console.log("Decoded:", decode); // Check decoded token
    // passing decode to req.user to access in isAdmin
    req.user = decode;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// checking if the user is admin using role 1
const isAdmin = async (req, res, next) => {
  try {
    const user = await Usermodel.findById(req.user.id);
    if (user.role !== 1) {
      return res.status(500).send({
        success: false,
        message: "User is not an admin",
        user,
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { requireSignIn, isAdmin };
