import { FaTachometerAlt } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    { name: "Income", icon: <RiMoneyDollarCircleLine />, path: "/income" },
    { name: "Expense", icon: <BiMoneyWithdraw />, path: "/expense" },
];

const NavLinks = () => {
    return (
        <nav className="mt-10 w-full flex flex-col gap-2 px-6">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? "bg-purple-500 text-white shadow-md" : "text-gray-700 hover:bg-purple-100"}`
                    }>
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                </NavLink>
            ))}
        </nav>
    );
}

export default NavLinks;