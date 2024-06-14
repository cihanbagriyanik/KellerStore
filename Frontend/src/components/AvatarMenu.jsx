import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";
import {  useSelector } from "react-redux";

const AvatarMenu = () => {
  const { logout } = useAuthCall();
  
  const {user} = useSelector(state=>state.auth)
  console.log(user)

  const [state, setState] = useState(false);
  const profileRef = useRef();
  // profileRef, profil düğmesine referans oluşturur. Bu referans, useEffect içinde kullanılarak, fare tıklamalarının profil düğmesi dışında gerçekleşip gerçekleşmediğini kontrol eder. Eğer tıklama profil düğmesinin dışında gerçekleşmişse, dropdown menüsü kapanır.

  const navigation = [
    { title: "Profile", path: "/profile" },
    { title: "Admin",path:'/admin' },
    { title: "Logout" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
    return () => document.removeEventListener("click", handleDropDown);
  }, []);

  const handleClick = (title) => {
    if (title == "Logout") {
      logout();
    }
    setState(false);
  };

  return (
    <div className="relative">
      <button
        ref={profileRef}
        className="w-12 h-12 outline-none rounded-full ring-offset-2 ring-gray-200 focus:ring-2 focus:ring-button-blue"
        onClick={() => setState(!state)}
      >
        <img
          src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
          className="w-full h-full rounded-full"
          alt="Profile"
        />
      </button>
      <ul
        className={`bg-white mt-2 space-y-2 absolute right-0 border rounded-md w-40 shadow-md ${
          state ? "" : "hidden"
        }`}
      >
       
{navigation.map((item, idx) => (
  <li key={idx}>
    {item.title === "Logout" ? (
      <button
        className="block text-gray-600 hover:bg-button-blue hover:text-white px-4 py-2 rounded-md cursor-pointer w-full text-left"
        onClick={() => handleClick(item.title)}
      >
        {item.title}
      </button>
    ) : (
      <>
        {item.title === "Admin" && !user?.isAdmin ? (
          null
        ) : (
          <Link
            className="block text-gray-600 hover:bg-button-blue hover:text-white px-4 py-2 rounded-md cursor-pointer"
            to={item.path}
            onClick={() => setState(false)}
          >
            {user?.isAdmin && item.title === "Admin" ? 'Admin' : item.title}
          </Link>
        )}
      </>
    )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvatarMenu;
