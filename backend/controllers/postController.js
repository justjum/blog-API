const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");
const PrismaClient = require("@prisma/client").PrismaClient;
const verifyToken = require("../config/jwtauth");

const prisma = new PrismaClient();

exports.getPost = async function (req, res, next) {};

exports.postPost = [
  body("title", "Post must have title,").isLength({ min: 3, max: 100 }),
  body("text", "Post must have text content").isLength({ min: 3 }),

  async function (req, res, next) {
    const errors = validationResult(req);
    console.log(req.userId);
    if (!errors.isEmpty()) {
      res.error(errors);
    }

    try {
      await prisma.post.create({
        data: {
          userId: req.userId,
          title: req.body.title,
          text: req.body.text,
        },
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

exports.putPost = async function (req, res, next) {};

exports.deletePost = async function (req, res, next) {};

// model Post {
//     id        String    @id @default(uuid()) @db.Uuid
//     author    User      @relation(fields: [userId], references: [id])
//     userId    String    @db.Uuid
//     title     String
//     text      String
//     image     String
//     createdAt DateTime  @default(now()) @db.Date
//     Comment   Comment[]
//     published Boolean   @default(false)
//   }
