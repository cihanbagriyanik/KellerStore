import React from "react";
import "../App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home";
import Navbar from "../components/Navbar";

import AllAds from "../pages/AllAds";
import NewAd from "../pages/NewAd";
import Profile from "../pages/Profile";
import Message from "../pages/Message";
import NotFound from "../pages/NotFound";
import Footer from "../components/Footer";


const AppRouter = () => {
  return (
    <Router>
      <div className="routes-container">
        <Navbar />
        <div style={{ flexGrow: "3" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="" element={<PrivateRouter />}>
              <Route path="allad" element={<AllAds />} />
              <Route path="newAd" element={<NewAd />} />
              <Route path="profile" element={<Profile />} />
              <Route path="message" element={<Message />} />
              <Route path="*" element={<NotFound/>} />
            </Route>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
};

export default AppRouter;
