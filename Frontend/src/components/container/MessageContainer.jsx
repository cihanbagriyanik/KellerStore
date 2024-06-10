
import { useSelector } from "react-redux";


const MessageContainer = ({message}) => {
 
  const {user} = useSelector(state=>state.auth)
  
console.log(message,"CONTAINER")


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
              <h1 className="text-2xl">{user?.userName} Muller</h1>
              <p className="">Jetz Aktiv</p>
            </div>
          </div>

          {/****** SENDER ******/}
          <div className="mt-3 mb-7 flex items-center justify-start gap-5 ">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/12/19/14/avatar-154379_1280.png"
              className="w-14 h-1/4 rounded-full ms-24"
              alt="Profile"
            />
            <div className="w-3/6">
              <p className="border border-button-blue p-3 text-white rounded-lg bg-button-blue">
                Hallo, Ich interessiere mich für Ihre Anzeige.
              </p>
            </div>
          </div>

          {/****** RECIVER ******/}
          <div className="mt-3 mb-7 flex items-center justify-end gap-5 ">
            <div className="w-3/6">
              <p className=" border border-light-grey p-3 text-black rounded-lg bg-light-grey">
                Vielen Dank für Ihr Interesse, wir werden uns so schnell wie
                möglich mit Ihnen in Verbindung setzen.
              </p>
            </div>
            <img
              src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
              className="w-14 h-1/4 rounded-full me-24"
              alt="Profile"
            />
          </div>
          <div className="mt-3 mb-7 flex items-center justify-end gap-5 ">
          
              <input className=" border border-light-grey p-3 text-black rounded-lg bg-light-grey" placeholder="message">
              
              </input>
           
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
