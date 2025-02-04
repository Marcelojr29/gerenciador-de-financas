import { Transaction } from '../App';
import { useState } from 'react';

interface TransactionListProps {
    transactions: Transaction[];
    deleteTransaction: (id: number) => void;
    editTransaction: (id: number, updatedTransaction: Transaction) => void;
}

function TransactionList({ transactions, deleteTransaction, editTransaction }: TransactionListProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedAmount, setEditedAmout] = useState('');
    const [editedCategory, setEditedCategory] = useState('');

    const handleEdit = (transaction: Transaction) => {
        setEditingId(transaction.id);
        setEditedDescription(transaction.description);
        setEditedAmout(transaction.amount.toString());
        setEditedCategory(transaction.category);
    };

    const handleSave = (id: number) => {
        editTransaction(id, {
            id,
            description: editedDescription,
            amount: +editedAmount,
            category: editedCategory,
            date: new Date().toLocaleDateString(),
        });
        setEditingId(null);
    };

    return (
        <ul>
            {transactions.map((transaction) => (
                <li key={transaction.id}>
                    {editingId === transaction.id ? (
                        <div>
                            <input 
                                type="text" 
                                value={editedDescription} 
                                onChange={(e) => setEditedDescription(e.target.value)} 
                            />
                            <input 
                                type="number" 
                                value={editedAmount} 
                                onChange={(e) => setEditedAmout(e.target.value)} 
                            />
                            <select 
                                value={editedCategory} 
                                onChange={(e) => setEditedCategory(e.target.value)}
                            >
                                    <option value="Receita">Receita</option>
                                    <option value="Despesa">Despesa</option>
                            </select>
                            <button onClick={() => handleSave(transaction.id)}>Salvar</button>
                        </div>
                    ) : (
                        <div>
                            <span>
                                {transaction.date} - {transaction.description}: R${transaction.amount} ({transaction.category})
                            </span>
                            <button onClick={() => handleEdit(transaction)}>Editar</button>
                            <button onClick={() => deleteTransaction(transaction.id)}>Excluir</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default TransactionList;