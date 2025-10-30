import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="w-full flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-7 shadow-sm">
            <Link to="/">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Expense Tracker
                </h1>
            </Link>
        </header>
    );
};

export default Header;