import { Transaction } from "../App";

interface SummaryProps {
    transactions: Transaction[];
}

function Summary({ transactions }: SummaryProps) {
    const totalIncome = transactions
        .filter((t) => t.category === 'Receita')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
        .filter((t) => t.category === 'Despesa')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;

    return (
        <div className='summary'>
            <p>Saldo: R${balance.toFixed(2)}</p>
            <p>Receitas: R${totalIncome.toFixed(2)}</p>
            <p>Despesas: R${totalExpense.toFixed(2)}</p>
        </div>
    );
}

export default Summary;