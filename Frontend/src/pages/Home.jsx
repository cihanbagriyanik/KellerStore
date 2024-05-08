import React from "react";
import Banner from "../components/Banner";

const Home = () => {
  const title = `Von hier aus konnen Sie alles #Kaufen, #mieten, #buchen.`;
  const desc = ` Kaufen und verkaufen Sie alles, von Gebrauchtwagen bis hin zu Mobiltelefonen und Comtutern, oder suchen Sie weltweit nach Immobilien, Jobs und mehr`;

  return (
    <div>
      <Banner title={title} desc={desc} />
      Home
    </div>
  );
};

export default Home;
