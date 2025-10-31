import NavLinks from "./NavLinks";
import Logout from "./Logout";
import { useEffect, useState } from "react";

const Sidebar = () => {

    const [user, setUser] = useState(null);
    // getUser from localStorage
    useEffect(() => {
        const raw = localStorage.getItem("auth");
        const auth = raw ? JSON.parse(raw) : null;
        setUser(auth?.user || null);
    }, []);

    return (
        <aside className="w-64 min-h-screen bg-white shadow-lg flex flex-col items-center py-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
                <img
                    src={user?.imageUrl}
                    alt="User Avatar"
                    className="w-20 h-20 object-cover rounded-full border-4 border-purple-500"
                />
                <h2 className="mt-3 text-xl font-semibold text-gray-800 capitalize bg-gray-100 px-4 rounded-sm py-1">{user?.fullName}</h2>
            </div>

            <div className="w-full">

                <NavLinks />
                <Logout />
            </div>
        </aside >
    );
};

export default Sidebar;