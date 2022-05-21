const bcrypt = require("bcrypt");
const passport = require("passport");
const {
  getUserByEmail,
  createUser,
  getUserAndPositionData,
  getUserById,
} = require("../queries");

const registerUser = async (req, res) => {
  try {
    const userRows = await getUserByEmail(req.body.email);
    if (userRows.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    } else {
      const { user_name, email, position, first_name, last_name, password } =
        req.body;
      const hashed_password = await bcrypt.hash(
        password,
        parseInt(process.env.SALT)
      );
      await createUser(
        user_name,
        email,
        position,
        first_name,
        last_name,
        hashed_password
      );

      return res.status(200).json({ message: "User account created." });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong,please try again." });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) throw error;
    if (!user) return res.status(404).json(info);
    else {
      req.logIn(user, async (err) => {
        if (err) throw err;
        const userDataRows = await getUserAndPositionData(user.user_id);
        const userData = userDataRows.rows[0];
        res.status(200).send(userData);
      });
    }
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout();
  res.send("User Logged Out");
};

const checkAuthenticationController = async (req, res, next) => {
  const isloggedIn = req.user !== undefined;
  if (!isloggedIn) {
    return res
      .status(500)
      .json({ isLoggedin: false, data: "User is not logged in" });
  }
  return res.status(200).json({ isLoggedin: true, data: req.user });
};

module.exports = { registerUser, login, checkAuthenticationController, logout };
