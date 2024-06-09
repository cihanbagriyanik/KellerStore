

import ProfileSidebar from "../components/ProfileSidebar";

import Banner from "../components/Banner";
import FollowerContanier from "../components/container/FollowerContanier";
import { useSelector } from "react-redux";

const Follower = () => {
  const title = `FOLGEN`;
  const {followers} =useSelector(state=>state.auth)
  console.log(followers,"takipci")

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>

        <div className="flex-grow">
          <FollowerContanier />
        </div>
      </div>
    </>
  );
};

export default Follower;