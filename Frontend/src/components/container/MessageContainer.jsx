import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMesaj from "../../hooks/useMesaj";

const MessageContainer = ({ messag }) => {
  const { user } = useSelector((state) => state.auth);
  const { mesajPost, mesajRead } = useMesaj();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(messag?.messages || []);

  //console.log(user);
  //console.log(messag, "CONTAINER");

  const sendMessage = () => {
    // console.log(text);
    const newMessage = { senderId: user, messageText: text };
    mesajPost({ adId: messag?.adId?._id, message: text });

    setMessages([...messages, newMessage]);
    setText("");
  };
  useEffect(() => {
    mesajRead(messag?._id);
  }, []);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h1 className="text-3xl ps-5 pt-5 ">Nachricht</h1>
      </div>
      <div className="bg-white mx-7 my-2 rounded-lg border-2 mb-10">
        <div className="">
          <div className="mt-3 mb-7 flex items-center justify-start gap-5 border-b border-b-black mx-10 pb-3">
            <img
              src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
              className="w-16 h-16 rounded-full ms-10"
              alt="Profile"
            />
            <div>
              <h1 className="text-2xl">{user?.userName} </h1>
              <p className="">Jetz Aktiv</p>
            </div>
          </div>

          {messages.map((item, index) => {
            if (item.senderId._id === user?._id) {
              return (
                <div
                  className="mt-3 mb-7 flex items-center justify-end gap-5 "
                  key={index}
                >
                  <div className="w-3/6">
                    <p className="border border-light-grey p-3 text-black rounded-lg bg-light-grey">
                      {item.messageText}
                    </p>
                  </div>
                  <img
                    src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                    className="w-14 h-1/4 rounded-full me-24"
                    alt="Profile"
                  />
                </div>
              );
            } else {
              return (
                <div
                  className="mt-3 mb-7 flex items-center justify-start gap-5 "
                  key={index}
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2013/07/12/19/14/avatar-154379_1280.png"
                    className="w-14 h-1/4 rounded-full ms-24"
                    alt="Profile"
                  />
                  <div className="w-3/6">
                    <p className="border border-button-blue p-3 text-white rounded-lg bg-button-blue">
                      {item.messageText}
                    </p>
                  </div>
                </div>
              );
            }
          })}
          <div className="mt-3 mb-7 flex items-center justify-end gap-5 ">
            <div className="w-3/6">
              <input
                className="w-full border border-light-grey p-3 text-black rounded-lg bg-light-grey"
                placeholder="message"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <img
              src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
              className="w-14 h-1/4 rounded-full me-24"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
