import React from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import SettingsContainer from "../components/container/SettingsContainer";

const Profile = () => {
  return (
    <div className="flex">
      <div>
        <ProfileSidebar />
      </div>

      <div className="flex-grow">
        <SettingsContainer />
      </div>
    </div>
  );
};

export default Profile;
