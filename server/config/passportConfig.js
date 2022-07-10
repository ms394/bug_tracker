const { getUserByEmail, getUserById } = require("../queries/users.queries");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function init(passport) {
  const authenticateUser = async (email, password, done) => {
    // Check if a user exists with the given email id
    const userRows = await getUserByEmail(email);
    const user = userRows.rows[0];
    if (user == null) {
      return done(null, false, {
        message: "No user exists with this email id.",
      });
    }
    try {
      // If user exists compare password
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    return done(null, user.user_id);
  });
  passport.deserializeUser(async (id, done) => {
    const userRows = await getUserById(id);
    const user = userRows.rows[0];
    return done(null, user);
  });
}

module.exports = init;
