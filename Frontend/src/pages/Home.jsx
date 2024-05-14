import React from "react";
import Banner from "../components/Banner";
import SideBar from "../components/SideBar";
import Stats from "../components/Stats";
import Team from "../components/Team";
import NewAdForm from "../components/forms/NewAdForm";
import NewAd from "./NewAd";



const Home = () => {
  const title = `Von hier aus konnen Sie alles #Kaufen, #mieten, #buchen.`;
  const desc = ` Kaufen und verkaufen Sie alles, von Gebrauchtwagen bis hin zu Mobiltelefonen und Computern, oder suchen Sie weltweit nach Immobilien, Jobs und mehr`;

  return (
    <div className=" ">
      <div className=" ">
        <Banner title={title} desc={desc} />
      </div>
      <div className="flex ">
        <div className=" ">
          <SideBar />
        </div>
        <div className=" m-5 flex-grow">
          <h1>Home</h1>

       

          {/* Burada içerik alanı, sidebar'ın yanında başlar ve footer'a kadar devam eder. */}
         
        </div>


          {/* Burada içerik alanı, sidebar'ın yanında başlar ve footer'a kadar devam eder. */}
         <div  className="mt-8 py-6 border-t items-center justify-between sm:flex">
          <Team/>
         </div>
         <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
          <Stats/>
        </div>
        </div>

       
      </div>
   
  );
};

export default Home;
