import DetailSidebar from "../components/DetailSidebar";
import { FaLocationPin } from "react-icons/fa6";

import { MdFavorite } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useAdCall from "../hooks/useAdCall";
import { useSelector } from "react-redux";
import useCategoryCall from "../hooks/useCategoryCall";
import DetailsFoto from "../components/DetailsFoto";

const Detail = () => {
  const { id } = useParams();

  const { single } = useAdCall();
  const { getCategory, favori, favoriAdd, favoriAll } = useCategoryCall();
  const { singleAd } = useSelector((state) => state.ad);
  //console.log(singleAd, "SINGLEAD");

  const { category, favoriAd } = useSelector((state) => state.category);
 // console.log(id, "sinle");

  useEffect(() => {
    single(id);
    getCategory();
    favori();
    favoriAll(id);
  }, []);

  const fav = (id) => {
    favoriAdd(id);
    favoriAll();
    favori();
  };
  return (
    <div className="flex">
      <div>
        <DetailSidebar />
      </div>
      <div className="flex-grow">
        <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg flex justify-center items-center ">
          <div className=" w-3/4 m-5 bg-white rounded-lg flex justify-center items-center pt-3 pb-3">
            <div className="text-center">
              <div className=" text-center mt-2 pt-3 ml-4 mr-2">
                <h2>Category</h2>
                <p>
                  {category?.map((item, index) => {
                    if (item._id == singleAd?.categoryId) {
                      return (
                        <p key={index} className="text-red-500">
                          {" "}
                          {item?.categoryName}
                        </p>
                      );
                    }
                  })}
                </p>
              </div>
              <div className="flex justify-center items-center mt-5 mb-3 gap-3">
                <FaLocationPin size={25} />
                <h2 className="text-lg">Location</h2>
              </div>
              <div>
                <h3 className="text-center text-xl text-gray-900">
                  {singleAd?.content}
                </h3>
              </div>
              <div className="flex justify-evenly px-24 py-7">
                <div className="flex items-center gap-3">
                  <button className="border-2 border-view-green p-2 rounded-full bg-view-green text-white">
                    <IoEyeSharp size={25} />
                  </button>
                  <p>{singleAd?.countOfVisitors}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fav(singleAd._id)}
                    className="border-2 border-like-yellow p-2 rounded-full bg-like-yellow text-white"
                  >
                    <MdFavorite size={25} />
                  </button>
                  <p>
                    {favoriAd?.map((item, index) => {
                      if (item.adId == singleAd._id) {
                        return <p key={index}>{item?.favorites?.length}</p>;
                      }
                    })}
                  </p>
                </div>
              </div>

              {/****** FOTOS ******/}
              <div className="">
              <DetailsFoto />
               
              </div>

              <div className="flex justify-evenly items-center mb-8 mt-8">
                <div className="w-72 flex justify-around items-center py-3 bg-button-blue shadow-lg shadow-button-blue">
                  <div className="text-white text-2xl font-bold">
                    <p>{singleAd?.price} €</p>
                  </div>
                  <div className="text-indigo-500">
                    <FaTag size={30} />
                  </div>
                </div>
                <div className="w-72 flex justify-around items-center py-3 bg-view-green shadow-lg shadow-button-blue">
                  <div className="text-button-blue text-2xl">
                    <p>{singleAd?.userId?.tel}</p>
                  </div>
                  <div className="text-green-200">
                    <FaPhone size={30} />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-4/5 mb-6  bg-background-grey ">
                  <div>
                    <h4 className=" m-5 text-left w-2/4  border-b-2 border-button-blue text-button-blue ">
                      BESCHREIBUNG
                    </h4>
                  </div>
                  <div className="m-6">
                    <p className="text-left">{singleAd?.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
