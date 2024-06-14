import Logo from "../assets/logo.png";
import NewAdButton from "./buttons/NewAdButton";
import RegisterButton from "./buttons/RegisterButton";
import LoginButton from "./buttons/LoginButton";
import MessageIcon from "./icons/MessageIcon";
import FavoriteIcon from "./icons/FavoriteIcon";
import AvatarMenu from "./AvatarMenu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useCategoryCall from "../hooks/useCategoryCall";
import { useEffect } from "react";
import Searchnav from "../pages/Searchnav";
import useAuthCall from "../hooks/useAuthCall";

const Navbar = () => {
  const dispatch = useDispatch();
  const { access, user, refreshh } = useSelector((state) => state.auth);
  const { favorUser } = useSelector((state) => state.category);
  const { refresh, logout } = useAuthCall();
  //console.log(user);
  console.log(access);

  const { favoriAll, favori } = useCategoryCall();

  const { messages } = useSelector((state) => state.mesaj);

  console.log(messages);
  const messageRe = messages
    .flatMap((item) => item?.messages) // Tüm mesajları tek bir düzlemde toplar
    .filter((message) => !message.isRead) // isRead değeri false olanları filtreler
    .filter((message) => message?.senderId?._id !== user?._id); //mesaj gonderiken gondereini diskalifiye icin gidermek icin

  //console.log(messageRe, "Unread Messages");

  useEffect(() => {
    favoriAll(), favori();
  }, []);

  //console.log(token, "NAVBAR USR");
  /**************************************************** */
  /********************** REFRESH **********************/
  /**************************************************** */
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      if (access) {
        const tokenExpirationTime = new Date(access.expiresAt).getTime();
        const currentTime = new Date().getTime();
        const timeUntilExpiration = tokenExpirationTime - currentTime;
        if (timeUntilExpiration <= 60000) {
          // 1 dakika kala token yenileme
          try {
            await refresh(refreshh);
          } catch (error) {
            logout();
          }
        }
      }
    }, 60000); // Her 10 dakikada bir kontrol et yoka cikar

    return () => clearInterval(refreshInterval);
  }, [access, refreshh, refresh, logout, dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (access) {
        const tokenExpirationTime = new Date(access.expiresAt).getTime();
        const currentTime = new Date().getTime();
        const timeUntilExpiration = tokenExpirationTime - currentTime;
        if (timeUntilExpiration <= 0) {
          dispatch(logout());
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [access, logout, dispatch]);

  /********************************************************************************* */

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
          {access ? (
            <div className="flex items-center space-x-8 py-3 mx-5 md:px-8 ">
              <div className="flex items-center">
                {user?.isAdmin && (
                  <div className="py-3">
                    <iframe
                      src="https://gifer.com/embed/1bqX"
                      width="78"
                      height="45"
                      frameBorder="0"
                      allowFullScreen
                      title="GIF"
                    ></iframe>
                  </div>
                )}

                <MessageIcon count={messageRe?.length} />
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
