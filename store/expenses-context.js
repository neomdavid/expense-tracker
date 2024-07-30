import { createContext, useReducer } from "react";
const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Flat Shoes",
    amount: 59.99,
    date: new Date("2024-05-29"),
  },
  {
    id: "e2",
    description: "Baggy Jeans",
    amount: 10.99,
    date: new Date("2024-06-29"),
  },
  {
    id: "e3",
    description: "Compression Shirt",
    amount: 5.99,
    date: new Date("2024-07-24"),
  },
  {
    id: "e4",
    description: "Tracker Pants",
    amount: 10.99,
    date: new Date("2024-07-21"),
  },
  {
    id: "e1",
    description: "Flat Shoes",
    amount: 59.99,
    date: new Date("2024-05-29"),
  },
  {
    id: "e2",
    description: "Baggy Jeans",
    amount: 10.99,
    date: new Date("2024-06-29"),
  },
  {
    id: "e3",
    description: "Compression Shirt",
    amount: 5.99,
    date: new Date("2024-07-24"),
  },
  {
    id: "e4",
    description: "Tracker Pants",
    amount: 10.99,
    date: new Date("2024-07-21"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString + Math.random().toString();
      return [...state, { ...action.payload, id: id }];
    case "UPDATE":
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: { id: id } });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
