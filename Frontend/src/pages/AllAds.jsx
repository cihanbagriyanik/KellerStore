import Banner from "../components/Banner";
import CategoryIconCard from "../components/cards/CategoryIconCard";
import SideBar from "../components/SideBar";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import useAdCall from "../hooks/useAdCall";

import HomeCard from "../components/cards/HomeCard";
import AdCard from "../components/cards/AdCard";
import SiedSearchCard from "../components/cards/SiedSearchCard";

const AllAds = () => {
  const { getAd } = useAdCall();
  const title = `Alle Anzeigen`;
  const { ad, homecateories, searchNav,siderSearch } = useSelector((state) => state.ad);



  //console.log(ad, homecateories, "allCARDDDDDD");
  //console.log(searchNav, "ALLADS SEARCNAV");

  useEffect(() => {
    getAd();
  }, [searchNav]);

  return (
    <div>
      <div className=" ">
        <Banner title={title} target={"/allad"} />
        <div>
          <CategoryIconCard />
        </div>
      </div>
      <div className="flex ">
        <div className=" ">
          <SideBar />
        </div>
        <div className="flex-grow">
          {siderSearch?.length > 0  ? <SiedSearchCard/> : (
            homecateories?.length > 0 ? (
            <AdCard data={homecateories} />
          ) : (
            <HomeCard data={ad} inp={searchNav} />
          )
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AllAds;
