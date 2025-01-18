import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getBudget, getUser } from "@/store"; // Adjust this path based on your project setup

const RouteProtector: React.FC = () => {
    const user = useSelector(getUser);
    const budget = useSelector(getBudget);
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }
    if (user && !budget) {
        return <Navigate to="/create-budget" replace />;
    }
    return <Outlet />;
};

export default RouteProtector;
