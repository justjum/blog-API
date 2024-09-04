const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");
const PrismaClient = require("@prisma/client").PrismaClient;
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.indexGet = async function (req, res, next) {
  res.render("index", {
    title: "Blog API",
    user: req.user,
  });
};

exports.loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login-error",
});

exports.loginError = async function (req, res, next) {
  res.render("error", {
    title: "Login Error",
    message: "Credentials incorrect",
  });
};

exports.logout = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect(".");
  });
};

exports.indexPost = [
  body("username", "Username must be at least 5 characters")
    .isLength({
      min: 5,
    })
    .custom(async (value, { req }) => {
      const user = await prisma.user.findFirst({
        where: { username: req.body.username },
      });
      console.log(user);
      if (user) {
        console.log("usererror");
        throw new Error("Username already in use.");
      }
    }),
  body("email", "Must be in email format").isEmail(),
  body("password", "Password must be eight characters long")
    .isLength({
      min: 8,
      max: 20,
    })
    .escape(),
  body("password-confirm", "Passwords do not match").custom(
    async (value, { req }) => {
      console.log(value);
      console.log(req.body.password);
      if (value != req.body.password) {
        throw new Error("Passwords must be identical");
      }
    }
  ),

  async function (req, res, next) {
    const errors = validationResult(req);
    const newUser = {
      username: req.body.username,
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      email: req.body.email,
      author: req.body.author,
    };

    if (!errors.isEmpty()) {
      console.log("error");
      res.render("", {
        title: "Blog API",
        subtitle: "Login",
        errors: errors.array(),
        newUser: newUser,
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          await prisma.user.create({
            data: {
              username: req.body.username,
              f_name: req.body.f_name,
              l_name: req.body.l_name,
              email: req.body.email,
              isAuthor: req.body.author == "Yes" ? true : false,
              password: hashedPassword,
            },
          });
          res.redirect("/");
        } catch (err) {
          return next(err);
        }
      });
    }
  },
];

exports.loginPost = async function (req, res, next) {
  try {
    console.log(req.body);
    console.log(req.json);
    console.log(req.headers);
    const user = await prisma.user.findFirst({
      where: { username: req.body.username },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed, please try again." });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Password failed, please try again." });
    }
    const token = jwt.sign({ id: user.id }, "secretthree", { expiresIn: "1h" });
    console.log(token);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
};
