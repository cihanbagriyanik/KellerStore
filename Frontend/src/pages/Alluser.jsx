import Banner from "../components/Banner";
import AdminSiedar from "../components/AdminSiedar";

import { useSelector } from "react-redux";
import UserCard from "../components/cards/UserCard";
import { useEffect } from "react";

import useAuthCall from "../hooks/useAuthCall";

const Alluser = () => {
  const title = `ADMIN`;

  const { userAll } = useAuthCall();
  const { userAld, searchNav, user } = useSelector((state) => state.auth);
  console.log(userAld, user, "gelen uaserAllll");
  useEffect(() => {
    userAll();
  }, []);

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
          <UserCard data={userAld} inp={searchNav} />
        </div>
      </div>
    </>
  );
};

export default Alluser;
