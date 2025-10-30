import NavLinks from "./NavLinks";
import Logout from "./Logout";

const Sidebar = () => {
    return (
        <aside className="w-64 min-h-screen bg-white shadow-lg flex flex-col items-center py-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full border-4 border-purple-500"
                />
                <h2 className="mt-3 text-lg font-semibold text-gray-800">Mike William</h2>
            </div>

            <div className="w-full">

                <NavLinks />
                <Logout />
            </div>
        </aside >
    );
};

export default Sidebar;