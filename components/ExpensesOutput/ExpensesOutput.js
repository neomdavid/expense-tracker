import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
const ExpensesOutput = ({ expenses, expensesPeriod }) => {
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
  ];
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList />
    </View>
  );
};

export default ExpensesOutput;
