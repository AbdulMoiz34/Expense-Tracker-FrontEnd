import { useState, useEffect } from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FormInput, PasswordField } from '../../components/Inputs';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../services/apiSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading, error, isSuccess, data } ] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(formData).unwrap();
            dispatch(setCredentials({ user: res.user, token: res.token }));
        } catch {}
    };

    useEffect(() => {
        if (isSuccess && data?.token) {
            navigate('/');
        }
    }, [isSuccess, data, navigate]);

    return (
        <div className="min-h-screen flex justify-center items-start lg:items-center p-4 bg-white dark:bg-gray-900 font-sans">
            {/* Message Box */}
            <div id="message-box-container" className="fixed top-5 left-1/2 -translate-x-1/2 p-4 z-50 hidden">
                <div id="message-box" className="bg-green-500 text-white p-3 rounded-lg shadow-xl"></div>
            </div>

            {/* Main Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl h-full lg:h-[700px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                {/* LEFT SIDE - LOGIN FORM */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <div className="mb-10 text-xl font-bold text-gray-900 dark:text-white">Expense Tracker</div>

                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome Back!</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400 mb-12">
                            Log in to continue managing your finances.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <FormInput
                                id="email"
                                label="Email Address"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <PasswordField
                                id="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            {/* Submit */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition duration-300 ease-in-out transform hover:scale-[1.005] active:scale-[0.995]"
                                >
                                    {isLoading ? 'Logging in...' : 'LOG IN'}
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-left">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?
                                <Link
                                    to="/signup"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1 transition"
                                >
                                    Sign up
                                </Link>
                            </p>
                            {error && (
                                <p className="text-sm text-red-600 mt-2">{"data" in error ? (error.data?.message || 'Login failed') : 'Login failed'}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - DASHBOARD PREVIEW */}
                <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-indigo-50 dark:bg-indigo-950/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-indigo-200/50 dark:bg-indigo-900/40 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-300/30 dark:bg-indigo-800/30 rounded-full transform -translate-x-1/4 translate-y-1/4 blur-2xl"></div>

                    <div className="relative z-10 p-6 bg-white dark:bg-gray-850 rounded-2xl shadow-xl w-full max-w-sm">
                        <div className="flex items-center space-x-3 mb-4 p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
                            <MdOutlineAccountBalanceWallet className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Track Income & Expenses</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$430,000</p>
                            </div>
                        </div>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-500 mt-6">
                            Log in now to see your progress!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;