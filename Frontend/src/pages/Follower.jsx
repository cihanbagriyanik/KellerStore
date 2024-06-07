

import ProfileSidebar from "../components/ProfileSidebar";

import Banner from "../components/Banner";
import FollowerContanier from "../components/container/FollowerContanier";

const Follower = () => {
  const title = `FOLGEN`;

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