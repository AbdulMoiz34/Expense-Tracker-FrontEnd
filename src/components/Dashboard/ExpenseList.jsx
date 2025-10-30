import { FiArrowRight } from "react-icons/fi";
import { FiShoppingBag, FiAirplane, FiZap, FiHome } from "react-icons/fi";
import ExpenseItem from "./ExpenseItem";

const expenses = [
    {
        id: 1,
        title: "Shopping",
        date: "17th Feb 2025",
        amount: 430,
        icon: <FiShoppingBag className="text-pink-500" />,
    },
    {
        id: 2,
        title: "Travel",
        date: "13th Feb 2025",
        amount: 670,
        icon: <FiAirplane className="text-blue-500" />,
    },
    {
        id: 3,
        title: "Electricity Bill",
        date: "11th Feb 2025",
        amount: 200,
        icon: <FiZap className="text-yellow-500" />,
    },
    {
        id: 4,
        title: "Loan Repayment",
        date: "10th Feb 2025",
        amount: 600,
        icon: <FiHome className="text-green-500" />,
    },
];

const ExpenseList = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Expenses</h2>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition">
                    See All <FiArrowRight size={16} />
                </button>
            </div>

            {/* List Items */}
            <div className="flex flex-col gap-5">
                {expenses.map((item) => (
                    <ExpenseItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;