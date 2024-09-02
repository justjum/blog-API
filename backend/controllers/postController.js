const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

exports.getPost = async function (req, res, next) {
  console.log(req.params);
  const post = await prisma.post.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (post) {
    res.json(post);
  } else {
    res.json({ msg: "Post not found" });
  }
};

exports.getAllPosts = async function (req, res, next) {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

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
          keyword: req.body.keyword,
          text: req.body.text,
        },
      });
      res.json({
        msg: "Post Created",
      });
    } catch (err) {
      return next(err);
    }
  },
];

exports.updatePost = async function (req, res, next) {
  console.log(req.userId);
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });

  if (!user.isAuthor) {
    res.status(401).send("This area is not for you.");
  } else {
    try {
      await prisma.post.update({
        where: {
          id: req.body.id,
        },
        data: {
          title: req.body.title,
          keyword: req.body.keyword,
          text: req.body.text,
        },
      });
      res.json({ msg: "Post updated" });
    } catch (err) {
      res.status(500).json({ error: "Error updating post." });
    }
  }
};

exports.deletePost = async function (req, res, next) {
  try {
    await prisma.post.delete({
      where: {
        userId: req.userId,
        id: req.body.id,
      },
    });
    res.json({ msg: "Post Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
};

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
