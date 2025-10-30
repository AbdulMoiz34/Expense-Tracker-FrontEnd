import { useMemo, useState } from "react";
import TransactionModal from "../../components/TransactionModal";
import { Card } from "../../components/Dashboard";
import { useGetExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from "../../services/apiSlice";
import { FiTrash2 } from "react-icons/fi";

const Expense = () => {
    const [open, setOpen] = useState(false);
    const { data: items = [], isLoading } = useGetExpensesQuery();
    const [addExpense] = useAddExpenseMutation();
    const [deleteExpense] = useDeleteExpenseMutation();

    const total = useMemo(() => items.reduce((sum, x) => sum + (x.amount || 0), 0), [items]);

    const handleAdd = async (tx) => {
        await addExpense({ category: tx.title, amount: tx.amount, date: tx.date });
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteExpense(id);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-8 bg-gray-50 rounded-md min-h-screen">
            <div className="flex flex-wrap gap-4 mb-6">
                <Card type="expenses" title="Total Expenses" amount={total} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Expenses</h2>
                    <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700">
                        Add Expense
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : items.length === 0 ? (
                    <p className="text-gray-500">No expenses yet.</p>
                ) : (
                    <div className="divide-y">
                        {items.map((x) => (
                            <div key={x._id} className="flex items-center justify-between py-3">
                                <div>
                                    <p className="text-gray-900 font-medium">{x.category || "Expense"}</p>
                                    <p className="text-xs text-gray-500">{new Date(x.date || x.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-rose-600 font-semibold">-${(x.amount || 0).toLocaleString()}</span>
                                    <button onClick={() => handleDelete(x._id)} className="text-rose-500 hover:text-rose-600">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
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