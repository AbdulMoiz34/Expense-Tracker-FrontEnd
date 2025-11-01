import { useMemo, useState } from "react";
import TransactionModal from "../../components/TransactionModal";
import { Card } from "../../components/Dashboard";
import { useGetIncomesQuery, useAddIncomeMutation, useDeleteIncomeMutation } from "../../services/apiSlice";
import { FiTrash2, FiArrowUpCircle, FiDownload } from "react-icons/fi";
import { Tooltip, message } from "antd";
import { exportToExcel, formattedDate } from "../../helpers";

const IncomeListItem = ({ x, handleDelete }) => {
    const amount = Math.abs(x.amount || 0);
    const sourceText = x.source || "Income";



    return (
        <div
            key={x._id}
            className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition duration-200 ease-in-out border-b last:border-b-0 border-gray-100"
        >
            <div>
                <p className="text-gray-900 font-semibold text-base">{sourceText}</p>
                <p className="text-sm text-gray-500 mt-0.5">{formattedDate(x.date)}</p>
            </div>

            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2">
                    <FiArrowUpCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-bold text-lg tabular-nums">
                        Rs. {amount}
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

    const downloadExcelFile = () => {
        const data = items.map(item => {
            const date = new Date(item.date).toLocaleDateString();
            return { source: item.source, amount: item.amount, date }
        })
        exportToExcel(data, "Income_Report");
    }

    return (
        <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

            <div className="flex flex-wrap gap-6 mb-8">
                <Card type="income" title="Total Income" amount={total} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Income Transactions
                    </h2>

                    <div className="flex items-center gap-3 ">
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