import React, { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import { FaLocationPin } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import useAdCall from "../hooks/useAdCall";

import buttonImage from "../../src/assets/btn.jpg";
import deleteImage from "../../src/assets/delete.jpg";
import reserve from "../../src/assets/reserve.jpg";
import update from "../../src/assets/update.jpg";

const MyAds = () => {
  const title = `Meine Anzeigen`;

  const { getAd, deleteAdData, putadReserve } = useAdCall();
  const { ad } = useSelector((state) => state.ad);

  const { user } = useSelector((state) => state.auth);
  const id = user?._id;

  const { favoriAd } = useSelector((state) => state.category);
  //console.log(favoriAd,"myads")

  const [openIndexes, setOpenIndexes] = useState({});
  const deleteAd = async (id) => {
    // console.log(id,"deletedki id")
    await deleteAdData(id);
    getAd();
  };
  const reserved = async (id) => {
    await putadReserve(id);
    getAd();
  };

  useEffect(() => {
    getAd();
  }, []);

  const toggleOpen = (index) => {
    setOpenIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>

        <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg flex-grow">
          <div className="flex justify-between items-center pt-3 pb-3">
            <h1 className="text-3xl ps-5 pt-5 ">Meine Anzeigen</h1>
          </div>
          {ad?.map((item, index) => {
            if (item?.userId == id) {
              return (
                <div
                  key={index}
                  className="bg-white mx-7 my-2 rounded-lg border-2 mb-10"
                >
                  <div>
                    <div className="px-16 pt-3 pb-5 flex ">
                      <div>
                        <img
                          //src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                          src={item?.images[0]}
                          width={600}
                          alt="img"
                          className="ms-1 mt-14"
                        />
                      </div>

                      <div className="flex-grow text-center mt-14">
                        <div>
                          <h1>Category</h1>
                        </div>
                        <div className=" mb-3">
                          <div className="flex justify-center items-center mt-5 mb-3 gap-3">
                            <FaLocationPin size={25} />
                            <h1 className="text-2xl">Location</h1>
                          </div>
                          <div className="px-14 mt-5">
                            <p>{item?.content}</p>
                          </div>

                          <div className="flex justify-around px-24 py-7">
                            <div className="flex items-center gap-3">
                              <button className="border-2 border-view-green p-2 rounded-full bg-view-green text-white">
                                <IoEyeSharp size={25} />
                              </button>
                              <p>{item?.countOfVisitors}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button className="border-2 border-like-yellow p-2 rounded-full bg-like-yellow text-white">
                                <MdFavorite size={25} />
                              </button>
                              <p>
                                {favoriAd?.map((it, index) => {
                                  // console.log(it?.adId)
                                  if (it.adId == item._id) {
                                    return (
                                      <p key={index}>{it?.favorites?.length}</p>
                                    );
                                  }
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-evenly items-center mb-8 ">
                    <div className="w-72 flex justify-around items-center py-3 bg-button-blue shadow-lg shadow-button-blue">
                      <div className="text-white text-2xl font-bold">
                        <p>{item.price} €</p>
                      </div>
                      <div className="text-indigo-500">
                        <FaTag size={30} />
                      </div>
                    </div>
                    <div className="w-72 flex justify-around items-center py-3 bg-view-green shadow-lg shadow-button-blue">
                      <div className="text-button-blue text-2xl">
                        <p>+49176555444333</p>
                      </div>
                      <div className="text-green-200">
                        <FaPhone size={30} />
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        className="w-12 h-11 outline-none rounded-full ring-offset-2 ring-gray-200 focus:ring-2 focus:ring-button-blue"
                        onClick={() => toggleOpen(index)}
                      >
                        <img
                          src={buttonImage}
                          className="w-full h-full rounded-full"
                          alt="Profile"
                        />
                      </button>
                      {openIndexes[index] && (
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-2">
                          <div className="w-12 h-12 bg-button-blue rounded-full ring-offset-2 ring-gray-200 focus:ring-2 focus:ring-button-blue">
                            <button onClick={() => deleteAd(item._id)}>
                              <img
                                src={deleteImage}
                                className="w-full h-full rounded-full"
                                alt="Delete"
                              />
                            </button>
                          </div>
                          <div className="w-12 h-12 bg-button-blue rounded-full ring-offset-2 ring-gray-200 focus:ring-2 focus:ring-button-blue">
                            <img
                              src={update}
                              className="w-full h-full rounded-full"
                              alt="Update"
                            />
                          </div>
                          <div className="w-12 h-12 bg-button-blue rounded-full ring-offset-2 ring-gray-200 focus:ring-2 focus:ring-button-blue">
                            <button onClick={() => reserved(item._id)}>
                              <img
                                src={reserve}
                                className="w-full h-full rounded-full"
                                alt="Reserve"
                              />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return;
          })}
        </div>
      </div>
    </>
  );
};

export default MyAds;
