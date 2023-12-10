import {
  Button,
  List,
  ListItem,
  FormHelperText,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  getExpenses as getExpensesapi,
  addExpenses,
  deleteExpense,
} from "../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AddExpense = () => {
  const [budgetName, setBudgetName] = React.useState("");
  const [budgetAmount, setBudgetAmount] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const [selectedMonth, setSelectedMonth] = React.useState(selectedDate.getMonth());
  // const [selectedYear, setSelectedYear] = React.useState(selectedDate.getFullYear());

  const [addState, setAddState] = React.useState(false);
  const [expensesList, setExpensesList] = React.useState([]);
  const [error, setError] = React.useState("");

  const onAddExpense = async () => {
    //Call api here
    try {
      await addExpenses({
        name: budgetName,
        amount: budgetAmount,
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
      setError("");
      resetData();
    } catch (error) {
      setError("Unable to Add budget.");
    }
  };

  const resetData = () => {
    setBudgetAmount(0);
    setBudgetName("");
  };

  const getExpenses = async (selectedMonth, selectedYear) => {
    try {
      //pass t
      const res = await getExpensesapi(selectedMonth, selectedYear);
      setExpensesList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteExpense = async (budgetId) => {
    try {
      await deleteExpense(budgetId);
      getExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    let selectedMonth = selectedDate.getMonth();
    let selectedYear = selectedDate.getFullYear();

    console.log(selectedMonth, selectedYear, "asfdasf");
    getExpenses(selectedMonth, selectedYear);
  }, [selectedDate, resetData]);

  return (
    <div className="expenses">
      <div className="calendar">
        <h2>Month Picker</h2>
        <Calendar
          view="year"
          onClickMonth={(value) => setSelectedDate(value)}
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <p>
          Selected Month:{" "}
          {selectedDate.toLocaleString("default", { month: "long" })}{" "}
          {/* {selectedDate.getMonth()+1} */}
          {selectedDate.getFullYear()}
        </p>
      </div>
      <div className="expenses-container">
        <TableContainer className="monthly-expenses" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Budget Name</TableCell>
                <TableCell align="right">Budget Amount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expensesList.map((budget) => (
                <TableRow>
                  <TableCell align="right">{budget.name}</TableCell>
                  <TableCell align="right">{budget?.amount}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      onClick={() => onDeleteExpense(budget.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {expensesList.length === 0 && (
                <TableRow>
                  <TableCell align="center">No data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!addState && (
          <Button variant="contained" onClick={() => setAddState(true)}>
            Add New Expense
          </Button>
        )}
        {addState && (
          <div className="new-expense">
            <h3> Expense Info </h3>
            <TextField
              label="BudgetName"
              variant="outlined"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            />
            <TextField
              label="Budget Amount"
              variant="outlined"
              type="number"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
            />
            {error && <FormHelperText error={true}>{error}</FormHelperText>}

            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                style={{ width: "200px" }}
                onClick={onAddExpense}
              >
                Add
              </Button>
              <Button
                color="warning"
                variant="contained"
                style={{ width: "200px" }}
                onClick={() => setAddState(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
