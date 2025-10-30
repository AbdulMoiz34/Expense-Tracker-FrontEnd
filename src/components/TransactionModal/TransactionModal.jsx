import { useState } from "react";
import { FiX, FiImage } from "react-icons/fi";

const TransactionModal = ({ type = "income", onClose, onSubmit }) => {
    
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !date) return;

        const newTransaction = {
            id: Date.now(),
            title,
            amount: parseFloat(amount),
            date,
            type,
        };

        onSubmit(newTransaction);
        onClose();
    };

    const isIncome = type === "income";
    const color = isIncome ? "purple" : "red";
    const label = isIncome ? "Add Income" : "Add Expense";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {label}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Icon Picker */}
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-14 h-14 bg-${color}-100 flex items-center justify-center rounded-xl`}
                        >
                            <FiImage className={`text-${color}-500 text-2xl`} />
                        </div>
                        <span className="text-gray-600 font-medium">Pick Icon</span>
                    </div>

                    {/* Title / Source */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            {isIncome ? "Income Source" : "Expense Title"}
                        </label>
                        <input
                            type="text"
                            placeholder={isIncome ? "Freelance, Salary, etc" : "Shopping, Travel, etc"}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Amount
                        </label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-2 mt-2 rounded-xl text-white font-semibold bg-${color}-500 hover:bg-${color}-600 transition`}
                    >
                        {label}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;