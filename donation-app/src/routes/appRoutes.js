import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainDonation from "../screens/Donation";

const MainRouter = () => {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<MainDonation />} />
            </Routes>
        </>
    );
};

export default MainRouter;
