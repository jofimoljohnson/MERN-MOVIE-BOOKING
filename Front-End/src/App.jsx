import Header from "./components/Header";
import Movies from "./components/Movies";
import Admin from "./components/Admin";
import Auth from "./components/Auth";
import HomePage from "./components/HomePage";

import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActins } from "./store";

const App = () => {
    const dispatch = useDispatch();

    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    console.log("isAdminLoggedIn", isAdminLoggedIn);
    console.log("isUserLoggedIn", isUserLoggedIn);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            dispatch(userActins.login());
        } else if (localStorage.getItem("adminId")) {
            dispatch(adminActions.login());
        }
    }, []);

    return (
        <div>
            <Header />
            <section>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </section>
        </div>
    );
};

export default App;
