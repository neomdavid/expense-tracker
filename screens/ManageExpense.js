import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expensesCxt = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCxt.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHander() {
    if (isEditing) {
      expensesCxt.updateExpense(expenseId, {
        description: 'UPDATED!',
        amount: 11.00,
        date: new Date('2024-08-07') // Ensure this date is within the last 7 days
      });
    } else {
      expensesCxt.addExpense({
        description: 'ADDED',
        amount: 7.00,
        date: new Date() // Use current date for testing
      });
    }
    navigation.goBack();
  }

//second commit
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHander}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={28}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
