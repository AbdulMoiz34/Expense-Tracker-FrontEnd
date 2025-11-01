const ListItem = ({ title, date, amount, icon, type }) => {
    let color = "text-gray-700";

    if (type === "expense") {
        color = "text-rose-500";
    } else if (type === "income") {
        color = "text-green-600";
    }
    return (
        <div className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-all p-4 rounded-xl cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-xl shadow-sm">{icon}</div>
                <div>
                    <h3 className="text-gray-800 font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-gray-500">{date}</p>
                </div>
            </div>
            <p className={`${color} font-bold text-sm`}>Rs. {amount}</p>
        </div>
    );
};

export default ListItem;