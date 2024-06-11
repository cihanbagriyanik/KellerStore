import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthCall from "../hooks/useAuthCall";
import useMesaj from "../hooks/useMesaj";

// Buttons Infos
const DetailButtons = [
  {
    name: "Nachricht",
    path: "#",
  },
  {
    name: "Merkliste",
    path: "/wishlist",
  },
  {
    name: "Folgen",
    path: "folgen",
  },
];

const DetailSidebar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { singleAd } = useSelector((state) => state.ad);
  //console.log(singleAd, "tek ");
  const { followers, user } = useSelector((state) => state.auth);
  //console.log(followers, user, "deateilssidebsarBAR");
  const { folgenSingle } = useAuthCall();
  const { mesajPost } = useMesaj();
  const [text, setText] = useState();

  const handleClick = (path) => {
    if (path == "#") {
      setIsModalOpen(!isModalOpen);
    } else if (path == "folgen") {
     // console.log("folgendesin adamim");
      folgenSingle(singleAd?.userId?._id);
    } else if (path === "/wishlist") {
      navigate(path);
    } else {
      //console.log(path, "sidebar drail");
      setIsModalOpen(!isModalOpen);
    }
  };
  const isFollowing = followers?.some(
    (follower) => follower?.userId._id == singleAd?.userId?._id
  );
  // console.log(isFollowing, "pppppppppp");

  const mesajSend = (e) => {
    e.preventDefault();
    mesajPost({ adId: singleAd._id, message: text });
    console.log("Mesaj gönderildi:", text);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="bg-background-filter-light-blue space-y-3 sm:w-80 py-5 ms-3 my-3 me-2 mt-10 rounded-lg">
        <div className=" text-center text-white  ">
          <h1>{singleAd?.userId?.userName}</h1>
          <h4>Aktif zeit {singleAd?.createdAt?.slice(0, 10)}</h4>
          {singleAd?.userId?.isBusiness ? <h4> Business</h4> : <h4> Privat</h4>}
        </div>
        {DetailButtons.map((x) => {
          return (
            <div className="text-center" key={x.name}>
              <button
                onClick={() => handleClick(x.path, x.dataModalTarget)}
                className={`btnProfile mt-3 w-56 ${
                  x.name === "Folgen" && isFollowing
                    ? "text-red-700"
                    : " text-blue-500"
                }`}
                /* -------------------------------------------------------------------------- */
                type="button"
                data-modal-target={x.dataModalTarget}
                data-modal-toggle={x.dataModalToggle}
                /* -------------------------------------------------------------------------- */
              >
                {x.name}
              </button>
            </div>
          );
        })}
      </nav>

      {/* <!-- Main modal --> */}
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 left-0 right-0 z-50 justify-center items-center h-screen md:inset-0 ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full mx-auto my-20">
          {/* <!-- Modal content --> */}
          <div className="relative bg-background-filter-light-blue rounded-lg shadow ">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-white ">
                Nachricht schreiben
              </h3>
              <button
                type="button"
                className="text-white bg-transparent hover:text-button-orange rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-toggle="crud-modal"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-white border border-gray-300 text-button-blue text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    // placeholder="Lukas Müller"
                    defaultValue={user?.userName}
                    required=""
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="description"
                    rows="12"
                    className="block p-2.5 w-full text-sm text-button-blue bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Schreibe eine freudliche Nachricht..."
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={mesajSend}
                  type="submit"
                  className="text-white inline-flex items-center bg-button-orange hover:text-button-blue focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center gap-3"
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M20 4L3 11L10 14M20 4L13 21L10 14M20 4L10 14"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                  Nachricht senden
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSidebar;
