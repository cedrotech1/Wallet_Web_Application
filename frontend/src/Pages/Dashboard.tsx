import { useEffect, useState } from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { TbPigMoney } from 'react-icons/tb';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import instance from '@/API';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  description: string;
  amount: number;
  account: string;
  subcategory: string;
  category: string;
  type: 'income' | 'expense';
}

interface Account {
  name: string;
  balance: number;
}

interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;
  incomeTransactions: number;
  expenseTransactions: number;
  incomePercentage: string;
  expensePercentage: string;
}

interface Budget {
  limit: number;
  currentSpending: number;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
    }).format(amount);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, transactionsRes, accountsRes, summaryRes, budgetRes] = await Promise.all([
        instance.get('/category'),
        instance.get('/transaction'),
        instance.get('/Account'),
        instance.get('/transaction/transaction-summary'),
        instance.get('/budgets', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNzM3MjgwNTk3LCJleHAiOjE3Mzk4NzI1OTd9.QBI9xmK70n0wWU067_MhA4EaXHIXexX3w3v0HkfZc34',
          },
        }),
      ]);
      setTransactions(
        transactionsRes.data.data.map((el: any) => ({
          description: el.description,
          amount: el.amount,
          account: el.account.name,
          subcategory: el.subcategory.name,
          category: el.subcategory.category.name,
          type: el.type,
        }))
      );
      setAccounts(accountsRes.data.data);
      setSummary(summaryRes.data.summary);
      setBudget(budgetRes.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [summary?.totalIncome || 0, summary?.totalExpense || 0],
        backgroundColor: ['#4CAF50', '#FF5252'],
        hoverBackgroundColor: ['#45a049', '#ff4444'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-600">Your financial overview at a glance.</p>
      </header>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
          <p className="text-gray-500">Total Transactions</p>
          <h2 className="text-2xl font-semibold">{summary?.totalTransactions || 0}</h2>
        </div>
        <div className="p-6 bg-green-50 shadow-lg rounded-lg hover:shadow-xl transition">
          <p className="text-green-700">Total Income</p>
          <h2 className="text-2xl font-semibold">
            {formatCurrency(summary?.totalIncome || 0)}
          </h2>
        </div>
        <div className="p-6 bg-red-50 shadow-lg rounded-lg hover:shadow-xl transition">
          <p className="text-red-700">Total Expense</p>
          <h2 className="text-2xl font-semibold">
            {formatCurrency(summary?.totalExpense || 0)}
          </h2>
        </div>
        {budget && (
          <div className="p-6 bg-blue-50 shadow-lg rounded-lg hover:shadow-xl transition">
            <p className="text-blue-700">Budget</p>
            <h2 className="text-2xl font-semibold">
              {formatCurrency(budget.limit)}
            </h2>
            <p className="text-sm text-gray-600">
              Spent: {formatCurrency(budget.currentSpending)}
            </p>
          </div>
        )}
      </section>

      {/* Content Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Transactions */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map((el, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-2 hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{el.description}</p>
                  <p className="text-sm text-gray-500">{el.category}</p>
                </div>
                <p
                  className={`font-bold ${
                    el.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {el.type === 'income' ? '+' : '-'}
                  {formatCurrency(el.amount)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent transactions.</p>
          )}
        </div>

        {/* Balance Per Account */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-bold mb-4">Balance Per Account</h3>
          <div className="grid grid-cols-2 gap-4">
            {accounts.map((el, idx) => (
              <div key={idx} className="p-4 bg-emerald-50 rounded-lg text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-700 text-white rounded-full mx-auto">
                  <TbPigMoney size={24} />
                </div>
                <p className="text-gray-800 mt-2">{el.name}</p>
                <p className="text-lg font-semibold text-emerald-700">
                  {formatCurrency(el.balance)}
                </p>
              </div>
            ))}
          </div>
          
        </div>
         {/* Pie Chart Section */}
      <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4">Income vs Expense</h3>
        <Pie data={pieData} />
      </div>
      </section>

     
    </div>
  );
};

export default Dashboard;
