import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login, Signup, Home, Income, Expense } from "../../pages";
import { DashboardLayout } from "../../layout";

const RequireAuth = ({ children }) => {
    const token = useSelector((s) => s.auth.token);
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={
                <RequireAuth>
                    <DashboardLayout />
                </RequireAuth>}>
                <Route path="/" element={<Home />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRouter;