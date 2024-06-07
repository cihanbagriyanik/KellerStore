import { useEffect } from "react"
import { useSelector } from "react-redux"
import useAuthCall from "../../hooks/useAuthCall"

import { FaClock, FaLocationPin } from "react-icons/fa6"

const FollowerContanier = () => {
    const {folgenGetSin} = useAuthCall()
    const {followSingle}= useSelector(state=>state.auth)
    console.log(followSingle,"following")
    useEffect(()=>{folgenGetSin()},[])
  return (
    <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg">
    <div className="flex justify-between items-center pt-3 pb-3">
    <h1 className="text-3xl ps-5 pt-5 ">Follower</h1>
    </div>
  
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-6">
          {followSingle?.map((items, index) => (
            <div key={index}>
              
                <article className="max-w-md mx-auto mt-4 shadow-2xl border rounded-lg duration-300 hover:shadow-sm bg-background-grey">
                 
                    <img
                    //  src={items?.images[0]}
                      loading="lazy"
                      className="w-full h-48 rounded-t-md"
                    />
                    <div className="border-b-2 border-gray-400 text-center mt-2 pt-3 ml-4 mr-2">
                      <h2></h2>
                    </div>
                    <div className="border-b-2 border-gray-400 pb-3 pt-3 ml-4 mr-2 mb-3 text-gray-900">
                      <div>
                        <h3 className="text-center text-xl text-gray-900">
                        
                        </h3>
                      </div>
                      <div className="mt-3">
                        <div className="flex mb-3 gap-3">
                          <FaLocationPin size={20} />
                          <h1>Location</h1>
                        </div>
                        <div className="flex gap-3">
                          <FaClock size={20} />
                          <h1>
                            {/* {new Date(items?.followUserId?.createdAt).toLocaleString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })} */}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 pb-3 flex justify-between">
                      <div>
                        <h1 className="text-2xl font-semibold">
                          {items?.followUserId.userName}
                        </h1>
                      </div>
                    
                    </div>
                 
                </article>
             
            </div>
          ))}
        </div>
  </div>
  )
}

export default FollowerContanier