import { useEffect, useState } from "react";
import Modals from "../cards/Modals";
import { useSelector } from "react-redux";
import useAuthCall from "../../hooks/useAuthCall";

//import Modals from "../cards/Modals";

const SettingsContainer = () => {
  const { profile } = useAuthCall();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { user, address } = useSelector((state) => state.auth);

  useEffect(() => {
    profile();
  }, [user]);

  return (
    <div>
      <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg">
        <div className="flex justify-between items-center pt-3 pb-3">
          <h1 className="text-3xl ps-5 pt-5 ">Profile</h1>
        </div>
        <div className="bg-white mx-7 my-2 rounded-lg border-2 mb-10">
          <div>
            <div className="px-16 pt-3  ">
              <h1 className="text-xl border-b-2 border-button-blue text-button-blue uppercase">
                Profilinformationen
              </h1>
              <div className="my-5 flex justify-between relative">
                <div className="flex">
                  <h2>Profil Name :</h2>

                  {user?.userName ? (
                    <h2 className="absolute left-52"> {user?.userName}</h2>
                  ) : (
                    <h2 className="absolute left-52 text-red-500">
                      {" "}
                      000000000
                    </h2>
                  )}
                </div>
                <div>
                  <button
                    onClick={handleOpen}
                    className="hover:underline hover:text-button-blue"
                  >
                    Bearbeiten
                  </button>
                </div>
              </div>
              <div className="my-5 mb-16 flex justify-between relative">
                <div className="flex">
                  <h2>Lieferadresse :</h2>
                  {address && address[0] ? (
                    <h2 className="absolute left-52">
                      {" "}
                      {address[0]?.city + address[0]?.zipCode}
                    </h2>
                  ) : (
                    <h2 className="absolute left-52 text-red-500">
                      {" "}
                      000000000
                    </h2>
                  )}
                </div>
                <div>
                  <button
                    onClick={handleOpen}
                    className="hover:underline hover:text-button-blue"
                  >
                    Bearbeiten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /* -------------------------------------------------------------------------- */}

        <div className="bg-white mx-7 my-2 rounded-lg border-2">
          <div>
            <div className="px-16 pt-3  ">
              <h1 className="text-xl border-b-2 border-button-blue text-button-blue uppercase">
                Kontoeinstellungen
              </h1>
              <div className="my-5 flex justify-between   relative">
                <div className="flex   ">
                  <h2>Telefonnummer :</h2>
                  {user?.tel ? (
                    <h2 className="absolute left-52"> {user?.tel}</h2>
                  ) : (
                    <h2 className="absolute left-52 text-red-500">
                      {" "}
                      000000000
                    </h2>
                  )}
                </div>
                <div>
                  <button
                    onClick={handleOpen}
                    className="hover:underline hover:text-button-blue"
                  >
                    Bearbeiten
                  </button>
                </div>
              </div>
              <div className="my-5 mb-16 flex justify-between relative">
                <div className="flex">
                  <h2>Email :</h2>
                  <h2 className="absolute left-52 "> {user?.email}</h2>
                </div>
                <div>
                  <button
                    onClick={handleOpen}
                    className="hover:underline hover:text-button-blue"
                  >
                    Bearbeiten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /* -------------------------------------------------------------------------- */}
      </div>
      <Modals
        open={open}
        handleOpen={handleOpen}
        user={user}
        address={address}
      />
    </div>
  );
};

export default SettingsContainer;
