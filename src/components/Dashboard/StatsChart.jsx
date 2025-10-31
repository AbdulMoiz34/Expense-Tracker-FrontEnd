import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CHART_COLORS = ["#4F46E5", "#F97316", "#EF4444"];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const item = payload[0];
        return (
            <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-md text-sm">
                <p className="font-bold text-gray-800 border-b pb-1 mb-1">{item.name}</p>
                <p className="text-gray-700">Amount: <span className="font-semibold text-base" style={{ color: item.color }}>${item.value.toLocaleString()}</span></p>
            </div>
        );
    }
    return null;
};

const StatsChart = ({ data }) => {
    const totalValue = data.reduce((sum, item) => sum + (item.value || 0), 0);
    const totalCurrency = `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 w-full mx-auto transition-all duration-300">

            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Expense Overview
            </h2>
            <div className="relative">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={130}
                            paddingAngle={2}
                            dataKey="value"
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                                    stroke="#fff"
                                    strokeWidth={3}
                                />
                            ))}
                        </Pie>

                        <Tooltip content={<CustomTooltip />} />

                        <Pie
                            data={[{ value: 1, name: 'Total' }]}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={0}
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>


            <div className="grid grid-cols-3 mt-8 text-center pt-4 border-t border-gray-100">

                <div className="flex flex-col items-center p-2">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                        <span className="w-3 h-3 rounded-full bg-indigo-600 block"></span>
                        <span>{data[0]?.name || "Category 1"}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center p-2 border-l border-r border-gray-100">
                    <div className="flex items-center gap-2 text-orange-500 font-bold mb-1">
                        <span className="w-3 h-3 rounded-full bg-orange-500 block"></span>
                        <span>{data[1]?.name || "Category 2"}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center p-2">
                    <div className="flex items-center gap-2 text-red-500 font-bold mb-1">
                        <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
                        <span>{data[2]?.name || "Category 3"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsChart;