import React, { useEffect, useState } from 'react';
import Input from './Input';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Button from '../UI/Button';
import { getFormattedDate } from '../../utils/date';

const ExpenseForm = ({
  cancelHandler,
  submitButtonLabel,
  onSubmit,
  defaulValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaulValues ? defaulValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaulValues ? getFormattedDate(defaulValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaulValues ? defaulValues.description : '',
      isValid: true,
    },
  });

  function inputValuesHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid Input', 'Please check your input values.');
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputValuesHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            maxLength: 10,
            placeholder: 'YYYY-MM-DD',
            onChangeText: inputValuesHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCapitalize: 'none',
          autoCorrect: false,
          onChangeText: inputValuesHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text>Your inputs are invalid.</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 12,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
