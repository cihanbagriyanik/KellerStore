import { useEffect } from "react";
import Banner from "../components/Banner";
import CategoryIconCard from "../components/cards/CategoryIconCard";
import AdContainer from "../components/container/AdContainer";
import useAdCall from "../hooks/useAdCall";
import { useSelector } from "react-redux";
import useCategoryCall from "../hooks/useCategoryCall";
import useAutthCall from "../hooks/useAuthCall";
import useMesaj from "../hooks/useMesaj";

const Home = () => {
  const title = `Von hier aus konnen Sie alles #Kaufen, #mieten, #buchen.`;

  const desc = ` Kaufen und verkaufen Sie alles, von Gebrauchtwagen bis hin zu Mobiltelefonen und Computern, oder suchen Sie weltweit nach Immobilien, Jobs und mehr`;
  const { getAd, neue, belibt, most } = useAdCall();
  const { getCategory, favori, favoriAll } = useCategoryCall();
  const { access } = useSelector((state) => state.auth);
  const { folgenAll, folgenGetSin, followerget } = useAutthCall();
  const { mesajGet } = useMesaj();

  useEffect(() => {
    folgenAll(), folgenGetSin();
    followerget();  mesajGet();
  }, [access]);

  const { neuesAd, belibtAd, mostAd } = useSelector((state) => state.ad);
  // console.log(ad, "adddddddddddddddddddddddddd");
  useEffect(() => {
    getAd();
    neue();
    belibt();
    most();
    getCategory();
    favori();
    favoriAll();
  }, []);

  return (
    <div className=" ">
      <div className=" ">
        <Banner title={title} desc={desc} target={"/allad"} />
        <div>
          <CategoryIconCard />
        </div>
      </div>
      <div className="flex ">
        {/* /* -------------------------------------------------------------------------- */}
        <div className="flex-grow ">
          {/* /* -------------------------------------------------------------------------- */}

          <AdContainer
            title={"Neueste"}
            target={"/allad"}
            data={[...neuesAd]}
          />

          <AdContainer
            title={"Beliebte"}
            target={"/allad?category=belibte"}
            data={[...belibtAd]}
          />

          <AdContainer
            title={"Most View"}
            target={"/allad"}
            data={[...mostAd]}
          />

          {/* /! -------------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Home;
