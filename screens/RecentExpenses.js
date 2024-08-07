import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
 const expensesContext = useContext(ExpensesContext);
 const recentExpenses = expensesContext.expenses.filter((expense)=>{
  const today = new Date();
  return (expense.date > getDateMinusDays(today, 7)) && (expense.date <= today);
 });
  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpenses} fallBackText={'No Registered Expenses for the Last 7 Days.'}/>
    </View>
  );
};

export default RecentExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
