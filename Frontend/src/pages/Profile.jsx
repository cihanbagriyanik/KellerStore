import React from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import SettingsContainer from "../components/container/SettingsContainer";
import Banner from "../components/Banner";

const Profile = () => {
  const title = `PROFILE`;

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
          <SettingsContainer />
        </div>
      </div>
    </>
  );
};

export default Profile;
