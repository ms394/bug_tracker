const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/test", (req, res) => res.send("In the User Router"));
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.login);

module.exports = userRouter;
