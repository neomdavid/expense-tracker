import { StyleSheet, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
const RecentExpenses = () => {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod="Last 7 days" />
    </View>
  );
};

export default RecentExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
