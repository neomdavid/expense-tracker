import { FlatList, View } from "react-native";
import ExpenseItem from "../ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id.toString()}  // Ensure the key is a string
      />
  );
};

export default ExpensesList;
