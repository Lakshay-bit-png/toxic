const userRouter = require("express").Router();
const UserController = require("../controller/user.controller");
const userModel = require("../models/user.model");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

userRouter.post("/signup", UserController.register);


module.exports = userRouter;
