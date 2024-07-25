import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { View } from "react-native";

const AllExpenses = () => {
  return (
    <View>
      <ExpensesOutput expensesPeriod="Total" />
    </View>
  );
};

export default AllExpenses;
