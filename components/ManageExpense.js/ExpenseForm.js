import React from 'react';
import Input from './Input';
import { View } from 'react-native';

const ExpenseForm = () => {
  function amountChangedHandler() {}
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangedHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          maxLength: 10,
          placeholder: 'YYYY-MM-DD',
          onChangeText: () => {},
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
      />
    </View>
  );
};

export default ExpenseForm;
