import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ConfigureBudgets from "../configure-budgets/configure-budgets";
import BudgetCharts from "../budget-charts/budget-charts";
import AddExpense from "../add-expense/add-expense";
import TokenDialog from "../token-dialog/token-dialog";
import {refreshToken as refreshTokenApi} from '../api';

const getTime = (time) => Math.floor(time / 1000); 
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const [tokenDialogStatus, setTokenDialogStatus] = React.useState(false);
  const [tokenExpiry, setTokenExpiry] = React.useState(null);

  // Check if the token is present and not expired
  React.useEffect(() => {
    const tokenObj = JSON.parse(localStorage.getItem("tokenObj"));

    if (!tokenObj || !tokenObj?.token) {
      navigate("/login");
      return;
    }

    setTokenExpiry(tokenObj.expiresAt);
  }, [navigate]);

  React.useEffect(() => {
    console.log(tokenExpiry, 'tokenExpiry');
    if(!tokenExpiry) return;
    // Function to calculate and update the remaining time
    const updateRemainingTime = () => {
      // console.log(getTime(new Date(new Date(tokenExpiry) - 1 * 60 * 1000).getTime()), 'first')
      // console.log(getTime((new Date().getTime())), 'second')
      if (
        getTime(new Date(new Date(tokenExpiry) - 1 * 60 * 1000).getTime()) ===
        getTime((new Date().getTime()))
      ) {
        setTokenDialogStatus(true);
      }
      else if(getTime(new Date(tokenExpiry).getTime()) <= getTime((new Date().getTime()))){
        handleLogout()
      }
    };

    // Update the remaining time initially
    updateRemainingTime();

    // Set up a timer to update the remaining time every second
    const timerId = setInterval(updateRemainingTime, 1000);

    // Cleanup: Clear the timer when the component is unmounted
    return () => clearInterval(timerId);
  }, [tokenExpiry]);

  const handleLogout = () => {
    // Remove the token from local storage on logout
    localStorage.removeItem("tokenObj");
    navigate("/login");
  };

  const onRedirectToLogin = () => {
    setTokenDialogStatus(false);
    // handleLogout();
  };

  const refreshToken = async () => {
    const tokenObj = JSON.parse(localStorage.getItem("tokenObj"));
    const response = await refreshTokenApi(tokenObj.email);
    localStorage.setItem("tokenObj", JSON.stringify(response.token));
    setTokenExpiry(response.token.expiresAt);
    setTokenDialogStatus(false);
  }

  const activeStyle = (tabName) => {
    return {
      fontWeight: activeTab === tabName ? "bold" : "normal",
      textDecoration: activeTab === tabName ? "underline" : "normal",
    };
  };
  return (
    <div>
      <div className="header">
        <b>Budget App</b>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="dashboard-content">
        <div className="tabs">
          <Button
            style={activeStyle("dashboard")}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </Button>
          <Button
            style={activeStyle("configure")}
            onClick={() => setActiveTab("configure")}
          >
            Configure Budget
          </Button>
          <Button
            style={activeStyle("add")}
            onClick={() => setActiveTab("add")}
          >
            Add Expense
          </Button>
        </div>
        {activeTab === "dashboard" && <BudgetCharts />}
        {activeTab === "configure" && <ConfigureBudgets />}
        {activeTab === "add" && <AddExpense />}
      </div>
      <TokenDialog
        open={tokenDialogStatus}
        handleClose={() => onRedirectToLogin()}
        handleConfirm={() => refreshToken()}
      />
    </div>
  );
};

export default Dashboard;
