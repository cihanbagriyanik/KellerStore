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
  const { access, user } = useSelector((state) => state.auth);
  const { favorUser } = useSelector((state) => state.category);
  console.log(user);

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
