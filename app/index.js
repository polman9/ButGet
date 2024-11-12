import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  initializeDatabase,
  addTransaction,
  getTransactions,
} from "../db/database.js";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function initDb() {
      try {
        setLoading(true);
        await initializeDatabase();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    initDb();
    // loadTransactions();
  }, []);

  // Function to load transactions from SQLite database
  // const loadTransactions = () => {
  //   getTransactions(
  //     (data) => setTransactions(data),
  //     (error) => console.error("Error loading transactions", error)
  //   );
  // };

  // Function to add a transaction to SQLite database
  const handleAddTransaction = () => {
    if (!name || !amount) {
      console.log("Please enter both Name and Amount");
      return;
    }

    addTransaction(
      name,
      parseFloat(amount),
      "expense", // Assuming 'expense' type for now
      () => {
        console.log("Transaction Added");
        setName("");
        setAmount("");
        loadTransactions(); // Reload transactions after adding
      },
      (error) => console.error("Error adding transaction", error)
    );
  };

  return (
    <View style={styles.container}>
      {/* Add New Transaction Form */}
      <View style={styles.addExpense}>
        <Text style={styles.heading}>Add New Transaction</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Transaction Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter transaction name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Button title="Add" onPress={handleAddTransaction} />
        </View>
      </View>

      {/* Transaction List */}
      <View style={styles.transactions}>
        <View style={styles.partHeader}>
          <Text>Last Payments</Text>
        </View>

        <View style={styles.partTransactions}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.oneTransaction}>
              <View style={styles.oneTransactionPhoto}></View>
              <View style={styles.oneTransactionTittleAndPrice}>
                <View style={styles.oneTransactionTittleAndDescription}>
                  <Text style={styles.oneTransactionTittle}>
                    {transaction.name}
                  </Text>
                  <Text style={styles.oneTransactionDescription}>
                    Description
                  </Text>
                </View>
                <View style={styles.oneTransactionPrice}>
                  <Text>{transaction.amount}$</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  addExpense: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  heading: {
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  transactions: {
    backgroundColor: "#E7E7E7",
    padding: 20,
  },
  partHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  linkText: {
    color: "blue",
  },
  partTransactions: {
    marginTop: 10,
  },
  oneTransaction: {
    backgroundColor: "white",
    width: "100%",
    height: 60,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  oneTransactionPhoto: {
    width: 32,
    height: 32,
    backgroundColor: "#D9D9D9",
    borderRadius: 50,
    marginRight: 8,
  },
  oneTransactionTittleAndPrice: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  oneTransactionTittleAndDescription: {
    justifyContent: "center",
  },
  oneTransactionTittle: {
    fontWeight: "bold",
  },
  oneTransactionDescription: {
    color: "#777",
  },
  oneTransactionPrice: {
    justifyContent: "center",
    alignItems: "center",
  },
});
