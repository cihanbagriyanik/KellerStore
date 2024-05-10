import React from "react";
import Banner from "../components/Banner";
import SideBar from "../components/SideBar";
import CategoryIconCard from "../components/cards/CategoryIconCard";
import Stats from "../components/Stats";
import Team from "../components/Team";

const Home = () => {
  const title = `Von hier aus konnen Sie alles #Kaufen, #mieten, #buchen.`;
  const desc = ` Kaufen und verkaufen Sie alles, von Gebrauchtwagen bis hin zu Mobiltelefonen und Computern, oder suchen Sie weltweit nach Immobilien, Jobs und mehr`;

  return (
    <div className=" ">
      <div className=" ">
        <Banner title={title} desc={desc} />
        <div>
          <CategoryIconCard />
        </div>
      </div>
      <div className="flex ">
        <div className=" ">
          <SideBar />
        </div>
        <div className="border-4 border-orange-500 flex-grow">
          <h1>Home</h1>

          <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
            <Team />
          </div>
          <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
            <Stats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
