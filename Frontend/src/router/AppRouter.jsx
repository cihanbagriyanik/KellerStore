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
import MyAds from "../pages/MyAds";
import Setting from "../pages/Setting";
import WishList from "../pages/WishList";
import Following from "../pages/Following";
import About from "../pages/About";
import Detail from "../pages/Detail";
import Follower from "../pages/Follower";
import DetailMessaj from "../pages/DetailMessaj";
import Admin from "../pages/Admin";
import Adminad from "../pages/Adminad";
import Adminuser from "../pages/Adminuser";
import Adminverbot from "../pages/Adminverbot";
import PrivatAdmin from "./PrivatAdmin";

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
              <Route path="newad" element={<NewAd />} />
              <Route path="profile" element={<Profile />} />
              <Route path="message" element={<Message />} />
              <Route path="myads" element={<MyAds />} />
              <Route path="settings" element={<Profile />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="following" element={<Following />} />
              <Route path="follower" element={<Follower />} />
              <Route path="about" element={<About />} />
              <Route path="detail/:id" element={<Detail />} />
              <Route path="detailmessage" element={<DetailMessaj />} />
              <Route path="*" element={<NotFound />} />
               <Route path="" element={<PrivatAdmin/>}>
                   <Route path="admin" element={<Admin />} />
                   <Route path="adminad" element={<Adminad />} />
                   <Route path="adminuser" element={<Adminuser />} />
                   <Route path="adminverbot" element={<Adminverbot />} />
                  </Route>

            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
