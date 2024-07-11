import { useState, useEffect } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import useAdCall from "../../hooks/useAdCall";

const Items = ({ currentItems }) => {
  
  //console.log(currentItems,"curentItems")
  const { deleteAdData } = useAdCall();

  const deleteAd = (id) => {
    deleteAdData(id);
  };
  return (
    <div className="items grid gap-7 sm:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-6">
      {currentItems &&
        currentItems?.map((items, index) => (
          <div key={index}>
            <article className="max-w-md mx-auto mt-4 shadow-2xl border rounded-lg duration-300 hover:shadow-sm bg-background-grey">
              <Link to={`/detail/${items?._id}`}>
                <div>
                
                  <div className="border-b-2 border-gray-400 text-center mt-2 pt-3 ml-4 mr-2">
                    <h2>{items.userName}</h2>
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
                          {new Date(items.createdAt).toLocaleString("tr-TR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-3 flex justify-between">
                    <div>
                      <h1 className="text-2xl font-semibold"> Tel:{items?.tel}</h1>
                    </div>
                    <div className="flex">
                      {items.countOfVisitors ? (
                        <div className="flex items-center gap-2">
                          {items.countOfVisitors} <IoEyeSharp size={25} />
                        </div>
                      ) : (
                        <MdFavorite size={25} />
                      )}
                    </div>
                  </div>
                </div>
              </Link>{" "}
              <div className="flex justify-center"> 
              
                <button
                  className="text-red-500"
                  onClick={() => {
                    deleteAd(items?._id);
                    // console.log(items._id);
                  }}
                >
                  DELETE
                </button>
              </div>
            </article>
          </div>
        ))}
    </div>
  );
};

const PaginatedItems = ({ items, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems}  />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

const UserCard = ({ data, inp }) => {
  const filteredData = data.filter((item) =>
    item.userName?.toLowerCase().includes(inp?.toLowerCase() || "")
  );
  return (
    <section className="mx-auto px-4 max-w-screen-xl md:px-8">
      <PaginatedItems items={filteredData} itemsPerPage={8}  />
      user
    </section>
  );
};

export default UserCard;