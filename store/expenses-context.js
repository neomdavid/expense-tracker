import { createContext, useContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense:({description, amount, date})=>{},
  updateExpense:(id, {description, amount, date})=>{},
  deleteExpense:(id)=>{}
});

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
    id: "e5",
    description: "Running Shoes",
    amount: 79.99,
    date: new Date("2024-08-01"),
  },
  {
    id: "e6",
    description: "Winter Jacket",
    amount: 129.99,
    date: new Date("2024-08-15"),
  },
];

function expenseReducer(state, action){
  switch(action.type){
    case 'ADD':
      const id = new Date().toString + Math.random().toString;
      console.log(id)
      return [{id, ...action.payload},...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense)=>expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense)=> expense.id !== action.payload);
    default:
      return state;
  }
}

const ExpensesContextProvider=({children})=>{
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData){
    dispatch({type:'ADD', payload:expenseData})
  };
  function updateExpense(id, expenseData){
    dispatch({type:'UPDATE', payload:{id:id, data:expenseData}})
  };
  function deleteExpense(id){
    dispatch({type:'DELETE', payload: id})
  };

  const value = {
    expenses:expensesState,
    addExpense:addExpense,
    updateExpense:updateExpense,
    deleteExpense:deleteExpense

  }

  return <ExpensesContext.Provider value={value}>
    {children}
  </ExpensesContext.Provider>
}

export default ExpensesContextProvider;