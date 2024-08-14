import { StyleSheet, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, [error]);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    return expense.date > getDateMinusDays(today, 7) && expense.date <= today;
  });

  function errorHandler() {
    setError(null);
  }

  if (isFetching) {
    return <LoadingOverlay></LoadingOverlay>;
  }
  if (error && !isFetching) {
    return <ErrorOverlay onConfirm={errorHandler} message={error} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesOutput
        expensesPeriod="Last 7 days"
        expenses={recentExpenses}
        fallBackText={'No Registered Expenses for the Last 7 Days.'}
      />
    </View>
  );
};

export default RecentExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
