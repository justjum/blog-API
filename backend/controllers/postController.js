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
  const posts = await prisma.post.findMany(
    {include: {
      author:true
    }}
  );
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
    console.log(req.body)
    console.log(req.userId)

    try {
      await prisma.post.create({
        data: {
          userId: req.userId,
          title: req.body.title,
          keyword: req.body.keyword,
          text: req.body.text,
          image: req.body.image,
          published: req.body.published
        },
      });
        res.json({ msg: "Post updated" });
    } catch (err) {
      res.status(500).json({ error: "Error creating post.",
        err:err
       });
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
    res.status(401).send({error:"Update of post limited to authors.", alert: true});
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
          published: req.body.published
        },
      });
      res.json({ msg: "Post updated", alert: false });
    } catch (err) {
      res.status(500).json({ error: "Error updating post.", alert: true });
    }
  }
};

exports.isPublished = async function (req, res, next) {
  console.log(req.body)
  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
  });

  if (!user.isAuthor) {
    res.status(401).send({error:"Update of post limited to authors.", alert: true});
  } else {
    try {
      const post = await prisma.post.findFirst({
        where: { id: req.body.id}
      })
      await prisma.post.update({
        where: {
          id: req.body.id,
        },
        data: {
          published: !post.published
        },
      });
      res.json({ msg: "Post updated", alert: false, published: !post.published });
    } catch (err) {
      res.status(500).json({ error: "Error updating post.", alert: true, err:err });
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
    res.status(500).json({ error: "Error deleting post", alert: true });
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
