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
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(" in catch "+typeof error.code)
    if (error.code == 11000) {
        res.status(400)
        next(new Error("this Email is Already Registred"))
    }else{
      next(error);
    }
    
  }
};
const loginSeller = async (req, res, next) => {
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
          throw new Error("Wrong Credentials");
        }
      } else {
        res.status(400);
        throw new Error("Registration Required");
      }
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  registerSeller,
  loginSeller,
};
