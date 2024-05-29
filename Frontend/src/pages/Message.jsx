

import ProfileSidebar from "../components/ProfileSidebar";
import MessageContainer from "../components/container/MessageContainer";
import Banner from "../components/Banner";

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
          <MessageContainer />
        </div>
      </div>
    </>
  );
};

export default Message;
