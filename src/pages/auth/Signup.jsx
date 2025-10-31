import { useState, useEffect, useRef } from "react";
import { FiUser, FiUpload } from "react-icons/fi";
import { FormInput, PasswordField } from "../../components/Inputs";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { useRegisterMutation } from "../../services/apiSlice";
import { useNavigate, Link } from "react-router-dom";
import { uploadFileOnCloudinary } from "../../helpers";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [image, setImage] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [imgError, setImgError] = useState("");
    const fileInput = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { error, isSuccess, data }] = useRegisterMutation();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImgError("");
            // Preview
            const reader = new FileReader();
            reader.onload = (ev) => setImgPreview(ev.target.result);
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImgPreview(null);
        }
    };

    const handleAvatarClick = () => {
        if (fileInput.current) fileInput.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setImgError("Profile image is required");
            return;
        }

        setImgError("");
        setLoading(true);
        try {
            const imageUrl = await uploadFileOnCloudinary(image);
            const res = await register({ ...formData, imageUrl }).unwrap();
            dispatch(setCredentials({ user: res.user, token: res.token }));
        } catch (error) {
            console.log("resoponse error -->", error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isSuccess && data?.token) {
            navigate("/");
        }
    }, [isSuccess, data, navigate]);

    return (
        <div className="min-h-screen flex justify-center items-start lg:items-center p-4 bg-white dark:bg-gray-900 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl h-full lg:h-[700px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                {/* === LEFT SIDE: FORM === */}
                <div className="p-4 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        {/* Logo/App Name */}
                        <div className="mb-10 text-xl font-bold text-gray-900 dark:text-white">
                            Expense Tracker
                        </div>
                        {/* Header */}
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Create an Account
                        </h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400 mb-8">
                            Join us today by entering your details below.
                        </p>
                        {/* Profile image uploader */}
                        <div className="flex flex-col items-center mb-6">
                            <div
                                tabIndex={0}
                                className={`relative  cursor-pointer rounded-full transition mb-2 ${imgPreview
                                    ? 'shadow-lg ring-2 ring-indigo-300/60'
                                    : 'border-2 border-dashed border-indigo-400 hover:border-indigo-600'
                                    }`}
                                style={{ width: 100, height: 100 }}
                                onClick={handleAvatarClick}
                                role="button"
                                aria-label="Upload profile photo"
                            >
                                {imgPreview ? (
                                    <img
                                        src={imgPreview}
                                        alt="preview"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="bg-indigo-100 dark:bg-indigo-900 w-24 h-24 rounded-full flex flex-col items-center justify-center">
                                        <FiUser className="w-12 h-12 text-indigo-600 dark:text-indigo-300" />
                                        <FiUpload className="w-5 h-5 text-indigo-600 mt-2" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInput}
                                    className="absolute hidden inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Profile image <span className="text-indigo-600">(required)</span></span>
                            {imgError && <span className="block text-xs text-red-500 mt-1">{imgError}</span>}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                                <FormInput
                                    id="fullName"
                                    label="Full Name"
                                    type="text"
                                    placeholder="John"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                <FormInput
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <PasswordField
                                    id="password"
                                    label="Password"
                                    placeholder="Min 8 Characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition duration-300 ease-in-out transform hover:scale-[1.005] active:scale-[0.995]"
                                >
                                    {loading ? "Creating account..." : "SIGN UP"}
                                </button>
                            </div>
                        </form>
                        {/* Footer */}
                        <div className="mt-6 text-left">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?
                                <Link
                                    to="/login"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1 transition"
                                >
                                    Login
                                </Link>
                            </p>
                            {error && (
                                <p className="text-sm text-red-600 mt-2">{"data" in error ? (error.data?.message || 'Registration failed') : 'Registration failed'}</p>
                            )}
                        </div>
                    </div>
                </div>
                {/* === RIGHT SIDE === */}
                <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-indigo-50 dark:bg-indigo-950/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-indigo-200/50 dark:bg-indigo-900/40 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-300/30 dark:bg-indigo-800/30 rounded-full transform -translate-x-1/4 translate-y-1/4 blur-2xl"></div>
                    <div className="relative z-10 p-6 bg-white dark:bg-gray-850 rounded-2xl shadow-xl w-full max-w-sm">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Financial Snapshot
                        </h3>
                        <div className="flex items-center space-x-3 mb-4 p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
                            <FiUser className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Track Income & Expenses</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$430,000</p>
                            </div>
                        </div>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-500 mt-6">
                            Join thousands managing their money better.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;