

import Banner from "../components/Banner";
import AdminSiedar from "../components/AdminSiedar";

import { useSelector } from "react-redux";
import AdminAd from "../components/cards/AdminAd";

const Adminad = () => {
  const title = `ADMIN`;
  const { ad, searchNav } = useSelector((state) => state.ad);
  return (
    <>
    <div>
      <Banner title={title} target={"/allad"} />
    </div>
    <div className="flex">
      <div>
        <AdminSiedar />
      </div>

      <div className="flex-grow">
      <AdminAd data={ad} inp={searchNav}  />
      </div>
    </div>
  </>
  )
}

export default Adminad