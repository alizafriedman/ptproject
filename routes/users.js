const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { User, Board } = db;

//use to get token for postman - pass in password, copy token 
// const password = bcrypt.hashSync('password')
// console.log(password)



const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];


//creates new user

router.post(
  "/new",
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username"),
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });
    const token = getUserToken(user);
    
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

//logs in existing user w token
router.post(
  "/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

//gets all boards for one specific user
router.get(
  "/all",
  requireAuth, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const boards = await Board.findAll({
      where: { userId: req.user.id },
    });
        console.log(boards);

    res.json({ boards });
  })
);



module.exports = router;
