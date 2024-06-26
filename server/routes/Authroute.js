const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/Usermodel");
const { requireSignIn, isAdmin } = require("../middlewwears/authMiddlewear");
const Usermodel = require("../models/Usermodel");
// router object
const router = express.Router();
// routes
// signup route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name) {
      return res.status(500).send({
        success: false,
        message: "Enter the name",
      });
    }
    if (!email) {
      return res.status(500).send({
        success: false,
        message: "Enter email",
      });
    }
    if (!password) {
      return res.status(500).send({
        success: false,
        message: "Enter password",
      });
    }

    // checking existing user
    const userExists = await userModel.findOne({ email: email });
    if (userExists) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }
    // hashing the password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // creating user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User succesfully signedup",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in registering",
    });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Email or password is required",
      });
    }

    // getting user from database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User is not signedup",
      });
    }

    // comparing password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "password is invalid",
      });
    }

    // token creation
    const token = await jwt.sign({ id: user._id }, process.env.jwt_secret, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Successfully loggedin",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in logging in",
    });
  }
});

// protected routes for users:

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected routes for admins:

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// exporting route
module.exports = router;

// getting all users

router.get("/get-users", async (req, res) => {
  try {
    // fetching all users
    const users = await Usermodel.find({});

    if (users) {
      res.status(200).send({
        success: true,
        message: "All users",
        users,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in fetching users",
    });
  }
});

// deleting user

router.delete("/delete-user/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Usermodel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in deleting the user",
    });
  }
});
