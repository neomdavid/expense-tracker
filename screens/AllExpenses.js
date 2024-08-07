import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { StyleSheet, View } from "react-native";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
 const expensesCxt =  useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod="Total" expenses={expensesCxt.expenses} fallBackText={'No expenses yet.'}/>
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
