import React from "react";
import Image from "../assets/bannerImage.jpg";

const Banner = ({ title, desc }) => {
  return (
    <div className="mainDivBanner">
      <div className="bannerCloak"></div>
      {/* <div className="bannerImg"></div> */}
      <img src={Image} className="bannerImg" alt="bannerImage" />
      <div className="textTop pt-10 text-center text-white flex flex-col items-center w-2/4">
        <h2 className="text-3xl font-medium"> {title} </h2>
        <p className="text-xl p-10 ">{desc}</p>
      </div>
    </div>
  );
};

export default Banner;
