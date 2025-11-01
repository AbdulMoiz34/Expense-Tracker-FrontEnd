import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CHART_COLORS = ["#4F46E5", "#F97316", "#EF4444"];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const item = payload[0];
        return (
            <div className="p-3.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-sm min-w-[140px] transition-all duration-200">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 tracking-tight">
                    {item.name}
                </p>
                <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                    <span
                        className="font-bold text-base"
                        style={{ color: item.color }}
                    >
                        Rs. {item.value}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};


const StatsChart = ({ data }) => {

    const isEmpty = data.every(item => item.value === 0);
    if (isEmpty) return null;
    return (
        <div className={`bg-white ${!data.length && "hidden"} rounded-2xl shadow-xl p-8 mt-8 w-full mx-auto transition-all duration-300`}>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
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
                    </PieChart>
                </ResponsiveContainer>
            </div>


            <div className="grid grid-cols-3 mt-8 text-center pt-4 border-t border-gray-100">

                <div className="flex flex-col items-center p-2">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
                        <span className="w-3 h-3 rounded-full bg-indigo-600 block"></span>
                        <span>{data[0]?.name}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center p-2 border-l border-r border-gray-100">
                    <div className="flex items-center gap-2 text-orange-500 font-bold mb-1">
                        <span className="w-3 h-3 rounded-full bg-orange-500 block"></span>
                        <span>{data[1]?.name}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center p-2">
                    <div className="flex items-center gap-2 text-red-500 font-bold mb-1">
                        <span className="w-3 h-3 rounded-full bg-red-500 block"></span>
                        <span>{data[2]?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsChart;