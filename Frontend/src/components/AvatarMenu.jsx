import { useEffect, useRef, useState } from "react";
import useAuthCall from "../hooks/useAuthCall";

const AvatarMenu = () => {
  const { logout } = useAuthCall();

  const [state, setState] = useState(false);
  const profileRef = useRef();

  const navigation = [
    { title: "Profile", path: "/profile" },
    { title: "Logout" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
    return () => document.removeEventListener("click", handleDropDown);
  }, []);

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
            <a
              className="block text-gray-600 hover:bg-button-blue hover:text-white px-4 py-2"
              href={item.path}
              onClick={logout}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvatarMenu;
