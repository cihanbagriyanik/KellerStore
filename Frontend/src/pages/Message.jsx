import ProfileSidebar from "../components/ProfileSidebar";

import Banner from "../components/Banner";
import MesajHome from "./MesajHome";

const Message = () => {
  const title = `NACHRICHT`;
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
          <MesajHome />
        </div>
      </div>
    </>
  );
};

export default Message;
