import { FiArrowRight, FiCreditCard } from "react-icons/fi";
import ListItem from "./ListItem";

const DashboardList = ({ title, items = [], loading = false, mode }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 w-full mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 font-medium transition">
                    See All
                    <FiArrowRight size={16} className="mt-0.5 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
            {/* List Items */}
            <div className="flex flex-col gap-4">
                {loading ? (
                    <div className="text-gray-400">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-gray-500">No items found</div>
                ) : (
                    items.map((item) => {
                        let color = "text-gray-900";
                        if (mode === "expense" || item.type === "expense") color = "text-rose-500";
                        if (mode === "income" || item.type === "income") color = "text-green-600";
                        const icon = <FiCreditCard className={color} />;
                        return (
                            <ListItem
                                key={item._id || item.id}
                                title={item.title}
                                date={new Date(item.date || item.createdAt).toLocaleDateString()}
                                amount={item.amount}
                                icon={icon}
                                type={item.type || mode}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default DashboardList;