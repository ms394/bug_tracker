require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const pool = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const apiErrorHandler = require("./error/api-error-handler");

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

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "users_session",
    }),
    name: "SID",
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  })
);

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
passportInitialize(passport);

app.use("/users", userRouter);
app.use("/position", positionRouter);
app.use("/project", projectRouter);

app.use(apiErrorHandler);

app.listen(PORT, console.log(`Server running at ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
});
