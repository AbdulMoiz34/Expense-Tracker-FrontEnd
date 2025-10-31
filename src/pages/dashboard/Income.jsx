import { useMemo, useState } from "react";
import TransactionModal from "../../components/TransactionModal";
import { Card } from "../../components/Dashboard";
import { useGetIncomesQuery, useAddIncomeMutation, useDeleteIncomeMutation } from "../../services/apiSlice";
import { FiTrash2, FiArrowUpCircle } from "react-icons/fi";
import { message } from "antd";

const IncomeListItem = ({ x, handleDelete }) => {
    const amount = Math.abs(x.amount || 0);
    const sourceText = x.source || "Income";
    const formattedDate = new Date(x.date || x.createdAt).toLocaleDateString();

    return (
        <div
            key={x._id}
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition duration-200 ease-in-out border-b last:border-b-0 border-gray-100"
        >
            <div>
                <p className="text-gray-900 font-semibold text-base">{sourceText}</p>
                <p className="text-sm text-gray-500 mt-0.5">{formattedDate}</p>
            </div>

            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2">
                    <FiArrowUpCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-bold text-lg tabular-nums">
                        +${amount.toLocaleString()}
                    </span>
                </div>

                <button
                    onClick={() => handleDelete(x._id)}
                    className="text-rose-400 hover:text-rose-600 p-2 rounded-full transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    aria-label={`Delete income: ${sourceText}`}
                >
                    <FiTrash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const Income = () => {
    const [open, setOpen] = useState(false);
    const { data: items = [], isLoading } = useGetIncomesQuery();
    const [addIncome] = useAddIncomeMutation();
    const [deleteIncome] = useDeleteIncomeMutation();

    const total = useMemo(() => items.reduce((sum, x) => sum + (x.amount || 0), 0), [items]);

    const handleAdd = async (tx) => {
        if (!tx.title || !tx.amount || tx.amount <= 0) {
            return message.error("Please provide valid title and amount.");
        }

        try {
            await addIncome({ source: tx.title, amount: tx.amount, date: tx.date });
            message.success("Income added successfully!");
        } catch (err) {
            message.error("Failed to add income.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteIncome(id);
            message.success("Income deleted successfully!");
        } catch (err) {
            message.error("Failed to delete income.");
        }
    };

    return (
        <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

            <div className="flex flex-wrap gap-6 mb-8">
                <Card type="income" title="Total Income" amount={total} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Income Transactions</h2>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-1 px-5 py-2.5 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                        <span className="text-xl leading-none">+</span> Add Income
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-gray-500 text-center py-4">Loading income transactions...</p>
                ) : items.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No income recorded yet. Start by adding one!</p>
                ) : (
                    <div className="rounded-lg overflow-hidden border border-gray-100">
                        {items.map((x) => (
                            <IncomeListItem key={x._id} x={x} handleDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>

            {open && (
                <TransactionModal type="income" onClose={() => setOpen(false)} onSubmit={handleAdd} />
            )}
        </div>
    )
}

export default Income;