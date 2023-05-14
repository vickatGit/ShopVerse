const jwt = require("jsonwebtoken");

const consumer = require("../models/consumerModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerConsumer = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (email && name && password) {
      const hashedPassword = await bcrypt.hash(password, 6);
      await consumer.create({
        email: email,
        consumerName: name,
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
    // if(error.code ==11000){
        res.status(400)
        res.json({
            message: "this Email is Already Registred"+error.code
          });
    // }
    // next(error);
  }
};
const loginConsumer = async (req,res,next) => {
  try {
    const { email, name, password } = req.body;
    if (email && name && password) {
      const user = await consumer.findOne({ email: email });
      if (user) {
        const isVerified = await bcrypt.compare(password, user.password);
        if (isVerified) {
          const token = await jwt.sign(
            {
              email,
              name
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
  registerConsumer,
  loginConsumer,
};
