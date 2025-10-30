import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordField = ({ id, label, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white rounded-none shadow-none focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400 dark:placeholder-gray-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    {showPassword ? (
                        <FiEyeOff
                            className="w-5 h-5 text-gray-400 hover:text-indigo-500 transition"
                            onClick={toggleVisibility}
                        />
                    ) : (
                        <FiEye
                            className="w-5 h-5 text-gray-400 hover:text-indigo-500 transition"
                            onClick={toggleVisibility}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordField;