var express = require("express");
var router = express.Router();
const { Expense } = require("../dbconfig");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const { month, year } = req.query

    const expenses = await Expense.findAll(
        {
            where: { month, year },
        }
    );
  res.send({ data: expenses });
});

router.delete("/:expenseId", async function (req, res, next) {
  const expenseId = req.params.expenseId;

     await Expense.destroy({
    where: { id: expenseId },
  });
  res.send({ message: "Successfully deleted the expense" });
});

router.post("/", async function (req, res, next) {
  const expense = await Expense.create({
    name: req.body.name,
    amount: req.body.amount,
    month: req.body.month,
    year: req.body.year,
  });

  res.send({ data: expense });
});

module.exports = router;
