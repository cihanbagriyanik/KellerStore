import { useLocation } from "react-router-dom";
import ProfileSidebar from "../components/ProfileSidebar";
import MessageContainer from "../components/container/MessageContainer";
import Banner from "../components/Banner";

const DetailMessaj = () => {
  const location = useLocation();
  const { messag } = location.state || {};

  if (!messag) {
    return <div>No message data</div>;
  }

  //console.log(messag);

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
          <MessageContainer messag={messag} />
        </div>
      </div>
    </>
  );
};

export default DetailMessaj;
