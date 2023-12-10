var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { User, generateToken } = require("../dbconfig");



/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password,
    });

    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid User" });
    }

    const sampePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (sampePassword) {
      const tokenObj = generateToken(user);
      req.session.tokenObj = tokenObj;
      // console.log("Session Token:", req.session);
      return res.status(200).json({ token: tokenObj, session: req.session.tokenObj });
    } else {
      return res.status(400).json({ error: "Invalid User" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
});

router.get("/refreshToken", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.query.email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid User" });
    }

    const tokenObj = generateToken(user);
    req.session.tokenObj = tokenObj;
    return res.status(200).json({ token: tokenObj, session: req.session.tokenObj });
  } catch (error) {
    console.error("Error creating a new token", error);
    return res.status(500).json({ error: "Error creating user" });
  }
});
module.exports = router;
