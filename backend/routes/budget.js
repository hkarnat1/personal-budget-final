const jwt = require('jsonwebtoken');
var express = require("express");
var router = express.Router();
const { Budget, User } = require("../dbconfig");


router.get("/", async function (req, res, next) {
  try {
    const userEmail = req.headers.email;
    console.log("email:", userEmail);

    const budgets = await Budget.findAll({
      where: { email: userEmail },
    });
    console.log("budgets:", budgets)
    res.send({ data: budgets });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.delete("/:budgetId", async function (req, res, next) {
  const budgetId = req.params.budgetId;

  const budgets = await Budget.destroy({
    where: { id: budgetId },
  });
  res.send({ message: "Successfully deleted the expense" });
});

router.post("/", async function (req, res, next) {
  console.log("request123", req.body.token);

  const userEmail = decodeToken(req.body.token).email;
  console.log(userEmail)
  const budget = await Budget.create({
    email: decodeToken(req.body.token).email,
    name: req.body.name,
    amount: req.body.amount,
  });
  console.log(budget)
  res.send({ data: budget });
});

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded;
  } catch (error) {
    // Token is either invalid or expired
    return null;
  }
};

module.exports = router;
