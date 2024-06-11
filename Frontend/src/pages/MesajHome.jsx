import { useSelector } from "react-redux";
import { useEffect } from "react";
import useMesaj from "../hooks/useMesaj";
import { useNavigate } from "react-router-dom";

const MesajHome = () => {
  const { messages } = useSelector((state) => state.mesaj);
  const { mesajGet } = useMesaj();
  //console.log(messages, "dddddddddddd");
  const navigate = useNavigate();

  useEffect(() => {
    mesajGet();
  }, []);
  const detailMesaj = (item) => {
    navigate("/detailmessage", { state: { messag: item } });
  };

  return (
    <>
      <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg">
        <div className="flex justify-between items-center pt-3 pb-3">
          <h1 className="text-3xl ps-5 pt-5">Nachricht burda</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          {messages?.map((item, index) => {
            // Mesajların isRead durumuna bakalim
            const isAnyMessageUnread = item.messages.some(
              (message) => !message.isRead
            );
            return (
              <button key={index} onClick={() => detailMesaj(item)}>
                <div
                  className={`message-item flex items-center ${
                    item?.adId?.images?.[0] ? "" : "no-image"
                  } ${isAnyMessageUnread ? "border-red-500" : ""}`}
                >
                  {item?.adId?.images?.[0] ? (
                    <img
                      src={`https://kellerstore.onrender.com/images/${item?.adId.images[0]}`}
                      alt=""
                      width="80"
                      className="h-48 w-48 rounded-full"
                    />
                  ) : (
                    <div className="h-48 w-48 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white">No Image</span>
                    </div>
                  )}
                  <div className="ml-4 text-black">
                    <h3>{item?.adId.price}</h3>
                    <p>{item?.adId.title}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex-grow">{/* <MessageContainer /> */}</div>
      </div>
    </>
  );
};

export default MesajHome;
