

import Banner from "../components/Banner";
import AdminSiedar from "../components/AdminSiedar";

import { useSelector } from "react-redux";
import AdminAd from "../components/cards/AdminAd";
import { useEffect } from "react";
import useAdCall from "../hooks/useAdCall";

const Adminad = () => {
  const title = `ADMIN`;
  const {getAd}= useAdCall()
  const { ad, searchNav } = useSelector((state) => state.ad);
  useEffect(()=>{getAd()},[])
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