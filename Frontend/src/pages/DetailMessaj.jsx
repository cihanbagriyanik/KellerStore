import { useLocation } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";
import MessageContainer from "../components/container/MessageContainer";
import Banner from "../components/Banner";

const DetailMessaj = () => {
  const location = useLocation();
  const { message } = location.state || {};

  if (!message) {
    return <div>No message data</div>;
  }

  console.log(message);

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
          <MessageContainer message={message}/>
        </div>
      </div>
    </>
  );
};

export default DetailMessaj;
