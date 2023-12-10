import axios from "axios";

const baseUrl = "http://localhost:3000";

export const login = async ({ email, password }) => {
  const res = await axios.post(baseUrl + "/auth/login", { email, password });
  return res;
};

export const signup = async ({ firstName, lastName, email, password }) => {
  try {
    const res = await axios.post(baseUrl + "/auth/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const getBudgets = async ({ email }) => {
  const res = await axios.get(baseUrl + "/budgets", {
      headers: {
          email: email,
      },
  });
  return res;
};


export const addBudgets = async ({ token, name, amount }) => {
    const res = await axios.post(baseUrl + "/budgets", { token, name, amount });
    return res;
}

export const deleteBudget = async (budgetId) => {
    const res = await axios.delete(baseUrl + "/budgets/" + budgetId);
    return res;
}

export const getExpenses = async (month, year) => {
    const res = await axios.get(baseUrl + `/expenses?month=${month}&year=${year}`);
    return res;
}

export const addExpenses = async ({ name, amount, month, year }) => {
    const res = await axios.post(baseUrl + "/expenses", { name, amount, month, year });
    return res;
}

export const deleteExpense = async (budgetId) => {
    const res = await axios.delete(baseUrl + "/expenses/" + budgetId);
    return res;
}

export const refreshToken = async (email) => {
  const res = await axios.get(baseUrl + `/auth/refreshToken?email=${email}`);
  return res.data;
}