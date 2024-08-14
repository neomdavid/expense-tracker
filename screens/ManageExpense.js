import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense.js/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expensesCxt = useContext(ExpensesContext);
  const selectedExpense = expensesCxt.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    expensesCxt.deleteExpense(expenseId);
    setIsSubmitting(true);
    await deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    if (isEditing) {
      expensesCxt.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCxt.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  //second commit
  return (
    <View style={styles.container}>
      <ExpenseForm
        cancelHandler={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaulValues={selectedExpense}
      />

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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
