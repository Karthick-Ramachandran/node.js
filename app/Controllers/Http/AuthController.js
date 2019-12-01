"use strict";
var nodemailer = require("nodemailer");

const User = use("App/Models/User");

const { validate } = use("Validator");
class AuthController {
  async login({ view }) {
    return view.render("frontend.login");
  }
  async secondLogin({ view }) {
    return view.render("frontend.second-login");
  }
  async thirdLogin({ view }) {
    return view.render("frontend.third-login");
  }
  async register({ view }) {
    return view.render("admin.register");
  }
  async newUser({ request, response, session }) {
    const req = request.all();
    const rules = {
      name: "required",
      email: "email|required",
      password: "required|min:8"
    };
    const validation = await validate(req, rules);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("/register");
    } else {
      const user = await new User();
      user.name = req.name;
      user.password = req.password;
      user.email = req.email;
      user.secondlogin = 0;
      user.thirdlogin = 0;
      user.isAdmin = 0;
      user.otp = null;
      await user.save();
      session.flash({ message: "Registered Succesfully" });
      return response.redirect("back");
    }
  }
  async authenticate({ request, auth, response, session }) {
    const req = request.all();
    const change = await User.query()
      .where("email", req.email)
      .first();
    if (change) {
      change.secondlogin = 0;
      change.thirdLogin = 0;
      change.otp = 0;
      await change.save();
      const loggedIn = await auth.attempt(req.email, req.password);
      if (loggedIn) {
        session.flash({
          message: "Logged in SuccessFully, Now Login with your Second Password"
        });
        return response.redirect("/second-login");
      } else {
        return response.redirect("/");
      }
    } else {
      session.flash({
        message: "Login Failed, You should give correct email address"
      });
      return response.redirect("back");
    }
  }
  async logout({ auth, session, response }) {
    await auth.logout();
    session.flash({
      message: "Logged out SuccessFully"
    });
    return response.redirect("/login");
  }
  async secondLoginpost({ request, response, session, auth }) {
    const req = request.all();
    const user = await auth.getUser();

    if (req.email == user.email && req.secondpassword == user.secondpassword) {
      const ch = await User.query()
        .where("email", req.email)
        .first();
      const otp = Math.floor(100000 + Math.random() * 900000);
      ch.otp = otp;
      ch.secondlogin = 1;
      await ch.save();
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "karthickara008@gmail.com",
          pass: "Chennai@123"
        }
      });
      var mailOptions = {
        from: "karthickara008@gmail.com",
        to: user.email,
        subject: "You Requested for OTP",
        html: `<b>Hello your otp is</b> <span style="color:green;">${otp} </span>`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      session.flash({ message: "Great, Now enter the OTP to continue" });
      return response.redirect("/third-login");
    }

    session.flash({
      message: "Something is Wrong, Please check email and second password"
    });
    return response.redirect("back");
  }
  async verify({ request, response, session, auth }) {
    const req = request.all();
    const user = await auth.getUser();

    if (req.otp == user.otp) {
      const ch = await User.query()
        .where("email", user.email)
        .first();
      ch.thirdlogin = 1;
      await ch.save();
      session.flash({ message: "Logged in Successfully" });
      return response.redirect("/dashboard/admin");
    }
    session.flash({ message: "OTP is wrong" });
    return response.redirect("back");
  }
  async resend({ response, session, auth }) {
    const user = await auth.getUser();
    const otp = Math.floor(100000 + Math.random() * 900000);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "karthickara008@gmail.com",
        pass: "Chennai@123"
      }
    });
    var mailOptions = {
      from: "karthickara008@gmail.com",
      to: user.email,
      subject: "You Requested for OTP",
      html: `<b>Hello your otp is</b> <span style="color:green;">${otp} </span>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    const ch = await User.query()
      .where("email", user.email)
      .first();
    ch.otp = otp;
    await ch.save();
    session.flash({ message: "Again OTP was sent" });
    return response.redirect("back");
  }
}

module.exports = AuthController;
