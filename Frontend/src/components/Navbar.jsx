import Logo from "../assets/logo.png";
import NewAdButton from "./buttons/NewAdButton";
import RegisterButton from "./buttons/RegisterButton";
import LoginButton from "./buttons/LoginButton";
import MessageIcon from "./icons/MessageIcon";
import FavoriteIcon from "./icons/FavoriteIcon";
import AvatarMenu from "./AvatarMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCategoryCall from "../hooks/useCategoryCall";
import { useEffect } from "react";
import Searchnav from "../pages/Searchnav";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { favorUser } = useSelector((state) => state.category);

  const { favoriAll, favori } = useCategoryCall();

  useEffect(() => {
    favoriAll(), favori();
  }, []);

  //console.log(token, "NAVBAR USR");

  return (
    <nav className="bg-white border-b z-50">
      <div className="flex items-center space-x-8 py-3 mx-5 md:px-8">
        <div className="flex-none lg:flex-initial">
          <Link to="/">
            <img src={Logo} width={120} height={50} alt="Logo" />
          </Link>
        </div>
        <div>
          <NewAdButton />
        </div>
        <div className="flex-1 flex items-center  sm:space-x-6 ">
          <Searchnav />
        </div>
        <div>
          {token ? (
            <div className="flex items-center space-x-8 py-3 mx-5 md:px-8 ">
              <div>
                <MessageIcon count={3} />
              </div>
              <div>
                <FavoriteIcon count={favorUser?.data?.length} />
              </div>
              <div>
                <AvatarMenu />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-8 py-3 mx-5 md:px-8">
              <div>
                <RegisterButton />
              </div>
              <div>
                <LoginButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
