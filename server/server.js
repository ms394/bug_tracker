require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { getAllUsers } = require("./queries");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const pool = require("./config/dbConfig");
const cookieParser = require("cookie-parser");

//Passport import
const passport = require("passport");
const passportInitialize = require("./config/passportConfig");

// routers imports
const projectRouter = require("./routes/project.router");
const userRouter = require("./routes/user.router");
const positionRouter = require("./routes/position.router");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser(process.env.SESSION_SECRET_KEY));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "users_session",
    }),
    name: "SID",
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportInitialize(passport);

app.use("/users", userRouter);
app.use("/position", positionRouter);
app.use("/project", projectRouter);

app.get("/", async (req, res) => {
  const userRows = await getAllUsers();
  res.send(userRows.rows);
});

app.listen(PORT, console.log(`Server running at ${PORT}`));