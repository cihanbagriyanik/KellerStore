import React from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import { FaLocationPin } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import Banner from "../components/Banner";

const MyAds = () => {
  const title = `Meine Anzeigen`;
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
          <div className="bg-white mx-7 my-2 rounded-lg border-2 mb-10">
            <div>
              <div className="px-16 pt-3 pb-5 flex ">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
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
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Explicabo aliquid atque pariatur eveniet eligendi
                        vero ratione nulla maxime molestias, consequuntur
                        aspernatur.
                      </p>
                    </div>

                    <div className="flex justify-around px-24 py-7">
                      <div className="flex items-center gap-3">
                        <button className="border-2 border-view-green p-2 rounded-full bg-view-green text-white">
                          <IoEyeSharp size={25} />
                        </button>
                        <p>123</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="border-2 border-like-yellow p-2 rounded-full bg-like-yellow text-white">
                          <MdFavorite size={25} />
                        </button>
                        <p>34</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-evenly items-center mb-8 ">
              <div className="w-72 flex justify-around items-center py-3 bg-button-blue shadow-lg shadow-button-blue">
                <div className="text-white text-2xl font-bold">
                  <p>2347 €</p>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAds;
