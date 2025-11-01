import { useMemo, useState } from "react";
import TransactionModal from "../../components/TransactionModal";
import { Card } from "../../components/Dashboard";
import { useGetExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from "../../services/apiSlice";
import { FiTrash2, FiArrowDownCircle, FiDownload } from "react-icons/fi";
import { message, Tooltip } from "antd";
import { exportToExcel, formattedDate } from "../../helpers";

const ExpenseListItem = ({ x, handleDelete }) => {
    const amount = Math.abs(x.amount || 0);
    const categoryText = x.category || "Expense";

    return (
        <div
            key={x._id}
            className="flex items-center justify-between p-4 bg-white hover:bg-red-50 transition duration-200 ease-in-out border-b last:border-b-0 border-gray-100"
        >
            <div>
                <p className="text-gray-900 font-semibold text-base">{categoryText}</p>
                <p className="text-sm text-gray-500 mt-0.5">{formattedDate(x.date)}</p>
            </div>

            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2">
                    <FiArrowDownCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-bold text-lg tabular-nums">
                        Rs. {amount.toLocaleString()}
                    </span>
                </div>

                <button
                    onClick={() => handleDelete(x._id)}
                    className="text-rose-400 hover:text-rose-600 p-2 rounded-full transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    aria-label={`Delete expense: ${categoryText}`}
                >
                    <FiTrash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const Expense = () => {
    const [open, setOpen] = useState(false);
    const { data: items = [], isLoading } = useGetExpensesQuery();
    const [addExpense] = useAddExpenseMutation();
    const [deleteExpense] = useDeleteExpenseMutation();

    const total = useMemo(() => items.reduce((sum, x) => sum + (x.amount || 0), 0), [items]);

    const handleAdd = async (tx) => {
        if (!tx.title || !tx.amount || tx.amount <= 0) {
            return message.error("Please provide valid category and amount.");
        }
        try {
            await addExpense({ category: tx.title, amount: tx.amount, date: tx.date });
            message.success("Expense added successfully!");
        } catch (err) {
            console.error("Failed to add expense:", err);
            message.error("Failed to add expense.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            message.success("Expense deleted successfully!");
        } catch (err) {
            console.error("Failed to delete expense:", err);
            message.error("Failed to delete expense.");
        }
    };
    const downloadExcelFile = () => {
        const data = items.map(item => {
            const date = new Date(item.date).toLocaleDateString();
            return { category: item.category, amount: item.amount, date }
        })
        exportToExcel(data, "Expense_Report");
    }

    return (
        <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

            <div className="flex flex-wrap gap-6 mb-8">
                <Card type="expenses" title="Total Expenses" amount={total} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Expense Transactions</h2>
                    <div className="flex items-center gap-3">
                        <Tooltip title="Download Excel Report" arrow>
                            <button
                                onClick={downloadExcelFile}
                                className={`${items.length ? "" : "hidden"} group relative p-2 rounded-full border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all duration-200 ease-in-out shadow-sm`}
                            >
                                <FiDownload size={20} className="transition-transform group-hover:scale-110" />
                            </button>
                        </Tooltip>

                        <button
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200"
                        >
                            <span className="text-xl leading-none">+</span>
                            <span>Add Income</span>
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <p className="text-gray-500 text-center py-4">Loading expense transactions...</p>
                ) : items.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No expenses recorded yet. Start by adding one!</p>
                ) : (
                    <div className="rounded-lg overflow-hidden border border-gray-100">
                        {items.map((x) => (
                            <ExpenseListItem key={x._id} x={x} handleDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>

            {open && (
                <TransactionModal type="expense" onClose={() => setOpen(false)} onSubmit={handleAdd} />
            )}
        </div>
    )
}

export default Expense;