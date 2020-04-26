import User from "../sequelize";
import crypto from "crypto";
require("dotenv").config();
import { LINK } from "../link/link";
const nodemailer = require("nodemailer");

module.exports = (app) => {
  app.post(`${LINK}/auth/users/`, (req, res, next) => {
    if (req.body.email === "") {
      res.json("email required");
    }
    // console.log(req.body.email);
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user === null) {
        // console.log('email not in database');
        res.json("email not in db");
      } else {
        const token = crypto.randomBytes(20).toString("hex");
        // console.log(token);
        user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 360000,
        });
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "resetglobaltraqs@gmail.com",
            pass: "gl0b4ltr4qs",
          },
        });
        const mailOptions = {
          from: "resetglobaltraqs@gmail.com",
          to: "${user.email}",
          subject: "Link to Reset Password",
          text:
            "You are receiving this email because you (or someone else) have requested a password reset for your account. \n\n" +
            "Please click on the following link, or paste it into your browser to complete the reset password process. \n\n" +
            "http://127.0.0.1:8000/#/resetPassword/${token} \n\n" +
            "If you did not request a password reset, you can ignore this email, as the link will expire in 1 hour.",
        };
        transporter.sendMail(mailOptions, function (err, response) {
          if (err) {
            console.error("there was an error: ", err);
          } else {
            // console.log('here is the response: ', response);
            res.status(200).json("recovery email sent");
          }
        });
      }
    });
  });
};
