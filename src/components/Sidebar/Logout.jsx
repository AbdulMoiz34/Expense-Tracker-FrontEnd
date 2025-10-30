import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="mt-3 w-full px-6">
            <button
                onClick={() => { dispatch(logout()); navigate('/login'); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                   text-gray-700 hover:text-red-600 hover:bg-red-100 focus:outline-none"
            >
                <BiLogOut className="text-xl" />
                <span className="font-medium">Logout</span>
            </button>
        </div>
    );
};

export default Logout;