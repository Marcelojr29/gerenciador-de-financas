import React, { useState } from "react";

interface TransactionFormProps {
    addTransaction: (description: string, amount: number, category: string) => void;
}

function TransactionForm({ addTransaction } : TransactionFormProps) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim() && amount && category) {
            addTransaction(description, +amount, category);
            setDescription('');
            setAmount('');
            setCategory('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Descrição" 
                required 
            />
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Valor" 
                required 
            />
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required
            >
                <option value="" disabled>Selecione uma categoria</option>
                <option value="Receita">Receita</option>
                <option value="Despesa">Despesa</option>
            </select>
            <button type="submit">Adicionar</button>
        </form>
    );
}

export default TransactionForm;