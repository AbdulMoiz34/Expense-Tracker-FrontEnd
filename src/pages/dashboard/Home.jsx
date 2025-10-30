import { useMemo } from "react";
import { Card, DashboardList } from "../../components/Dashboard";
import { useGetIncomesQuery, useGetExpensesQuery } from "../../services/apiSlice";

const Home = () => {
    const { data: incomes = [], isLoading: loadingIncome } = useGetIncomesQuery();
    const { data: expenses = [], isLoading: loadingExpenses } = useGetExpensesQuery();

    const totalIncome = useMemo(() => incomes.reduce((sum, x) => sum + (x.amount || 0), 0), [incomes]);
    const totalExpenses = useMemo(() => expenses.reduce((sum, x) => sum + (x.amount || 0), 0), [expenses]);
    const balance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);

    const items = useMemo(() => (
        [
            ...incomes.map(x => ({ ...x, type: "income" })),
            ...expenses.map(x => ({ ...x, type: "expense" }))
        ].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
    ), [incomes, expenses]);
    const recentTransactions = items.slice(0, 5);
    const recentExpenses = expenses.slice(0, 5);
    const loading = loadingIncome || loadingExpenses;

    return (
        <div className="p-8 bg-gray-50 rounded-md min-h-screen">
            {/* Top Section: Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                <Card type="balance" title="Total Balance" amount={balance} />
                <Card type="income" title="Total Income" amount={totalIncome} />
                <Card type="expenses" title="Total Expenses" amount={totalExpenses} />
            </div>

            {/* Bottom Section: Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DashboardList title="Recent Expenses" items={recentExpenses} loading={loading} mode="expense" />
                <DashboardList title="Recent Transactions" items={recentTransactions} loading={loading} />
            </div>
        </div>
    );
};

export default Home;
