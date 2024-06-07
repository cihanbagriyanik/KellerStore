

import ProfileSidebar from "../components/ProfileSidebar";
import FollowingContainer from "../components/container/FollowingContainer";
import Banner from "../components/Banner";

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
          <FollowingContainer />
        </div>
      </div>
    </>
  );
};

export default Follower;