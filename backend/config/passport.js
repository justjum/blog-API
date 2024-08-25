const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryp = require("bcryptjs");
const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: { username: username },
      });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        //no match!
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Passport Middleware
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
