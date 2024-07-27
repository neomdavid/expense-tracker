import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { StyleSheet, View } from "react-native";

const AllExpenses = () => {
  return (
    <View style={styles.container}>
      <ExpensesOutput expensesPeriod="Total" />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
