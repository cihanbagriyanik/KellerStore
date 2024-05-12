import React from "react";
import Banner from "../components/Banner";
import CategoryIconCard from "../components/cards/CategoryIconCard";
import Stats from "../components/Stats";
import Team from "../components/Team";
import AdCard from "../components/cards/AdCard";
import AdAllButton from "../components/buttons/AdAllButton";

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
        {/* /* -------------------------------------------------------------------------- */}
        <div className="flex-grow ">
          {/* /* -------------------------------------------------------------------------- */}
          <div className="border w-5/6 m-auto bg-light-grey pb-7 mb-20">
            <div className="flex justify-between items-center pt-3 pb-3">
              <h1 className="text-3xl ps-5">
                Neueste <span className="text-button-blue">Anzeigen</span>
              </h1>
              <div className="me-24">
                <AdAllButton />
              </div>
            </div>
            <div>
              <AdCard />
            </div>
          </div>

          <div className="border w-5/6 m-auto bg-background-grey pb-7 mb-20">
            <div className="flex justify-between items-center pt-3 pb-3">
              <h1 className="text-3xl ps-5">
                Beliebte <span className="text-button-blue">Anzeigen</span>
              </h1>
              <div className="me-24">
                <AdAllButton />
              </div>
            </div>
            <div>
              <AdCard />
            </div>
          </div>

          <div className="border w-5/6 m-auto bg-background-grey pb-7 mb-20">
            <div className="flex justify-between items-center pt-3 pb-3">
              <h1 className="text-3xl ps-5">
                Most View <span className="text-button-blue">Anzeigen</span>
              </h1>
              <div className="me-24">
                <AdAllButton />
              </div>
            </div>
            <div>
              <AdCard />
            </div>
          </div>

          {/* /! -------------------------------------------------------------------------- */}
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
