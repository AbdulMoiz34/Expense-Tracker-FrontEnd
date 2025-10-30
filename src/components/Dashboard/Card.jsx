import { FaWallet, FaCreditCard } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';

const icons = {
    balance: <FaCreditCard className="text-white" size={28} />,
    income: <FaWallet className="text-white" size={28} />,
    expenses: <GiMoneyStack className="text-white" size={28} />,
};

const colors = {
    balance: "bg-violet-500",
    income: "bg-orange-500",
    expenses: "bg-red-500",
};

const Card = ({ type, title, amount }) => {
    return (
        <div className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-6 w-full max-w-sm transition-all duration-300 hover:shadow-lg">
            <div className={`p-4 rounded-full ${colors[type]} shadow-md`}>
                {icons[type]}
            </div>
            <div>
                <h4 className="text-gray-600 font-medium">{title}</h4>
                <p className="text-2xl font-semibold text-gray-900">${amount.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Card;