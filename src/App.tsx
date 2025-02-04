import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import CategoryManager from './components/CategoryManager';
import './App.css';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (description: string, amount: number, category: string) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount,
      category,
      date: new Date().toLocaleDateString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const editTransaction = (id: number, updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((transaction) => transaction.id ? updatedTransaction : transaction
      )
    );
  };

  return (
    <div className="app">
      <h1>Gerenciador de Finanças</h1>
      <Summary transactions={transactions} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} editTransaction={editTransaction} />
      {/* <CategoryManager /> */}
    </div>
  );
}

export default App
