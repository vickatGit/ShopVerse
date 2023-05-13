const jwt = require("jsonwebtoken");

const seller = require("../models/sellerModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerSeller = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (email && name && password) {
      const hashedPassword = await bcrypt.hash(password, 6);
      await seller.create({
        email: email,
        sellerName: name,
        password: hashedPassword,
      });
      res.status(201);
      res.json({
        email: email,
        sellerName: name,
        message: "Registration Successful"
      });
    } else {
      res.status(400);
      //   throw new Error("Invalid data");
      res.json({
        message: "Invalid Data"
      });
    }
  } catch (error) {
    next(error);
  }
};
const loginSeller = async (req,res,next) => {
  try {
    const { email, name, password } = req.body;
    if (email && name && password) {
      const user = await seller.findOne({ email: email });
      if (user) {
        const isVerified = await bcrypt.compare(password, user.password);
        if (isVerified) {
          const token = await jwt.sign(
            {
              email,
              name,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "10d" }
          );
          res.status(201);
          res.json({
            message: "Successfully Logged in",
            token: token,
          });
        } else {
          res.status(400);
          //   throw new Error("Wrong Creedentials");
          res.json({
            message: "Wrong Credentials",
          });
        }
      } else {
        res.status(400);
        // throw new Error("Registration Required");
        res.json({
          message: "Registration Required",
        });
      }
    } else {
      res.status(400);
      //   throw new Error("Invalid data");
      res.json({
        message: "Invalid Data",
      });
    }
  } catch (error) {
    // next(error);
    console.log(error)
  }
};

module.exports = {
  registerSeller,
  loginSeller,
};
