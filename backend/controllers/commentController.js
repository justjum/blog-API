const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

exports.getAllComments = async function (req, res, next) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.params.postId,
      },
    });
    if (!comments) {
      res.json({ msg: "No comments" });
    }
    res.json(comments);
  } catch (err) {
    res.status(500).send("Error loading comments.");
  }
};

exports.getComment = async function (req, res, next) {
  try {
    const comment = await prisma.comment.findFirst({
      where: {
        id: req.params.commentId,
      },
    });
    if (!comment) {
      res.send("Comment not found.");
    }
    res.json(comment);
  } catch (err) {
    res.status(500).send("Error loading comment");
  }
};

exports.postComment = async function (req, res, next) {
  try {
    const comment = await prisma.comment.create({
      data: {
        userId: req.userId,
        postId: req.body.postId,
        text: req.body.text,
      },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).send("Error creating commment.");
  }
};

exports.updateComment = async function (req, res, next) {
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });

  console.log(user);

  if (!user.isAuthor) {
    res.status(401).send("Sorry, you can't do that.");
  }

  try {
    await prisma.comment.update({
      where: {
        id: req.params.commentId,
      },
      data: {
        text: req.body.text,
      },
    });
    res.send("Comment Updated");
  } catch (err) {
    res.status(500).send("Could not update comment.");
  }
};

exports.deleteComment = async function (req, res, next) {
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });

  if (!user.isAuthor) {
    res.status(401).send("Sorry, you can't do that.");
  }

  try {
    await prisma.comment.delete({
      where: {
        id: req.params.commentId,
      },
    });
    res.send("Comment Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};

// model Comment {
//     id        String   @id @default(uuid()) @db.Uuid
//     author    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//     userId    String   @db.Uuid
//     post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
//     postId    String   @db.Uuid
//     createdAt DateTime @default(now())
//   }
