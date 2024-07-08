import Car from "../../assets/automobile.png";
import Furniture from "../../assets/furniture.png";
import Electronics from "../../assets/electronics.png";
import Animals from "../../assets/animals.png";
import Fashion from "../../assets/fashion.png";
import Properties from "../../assets/properties.png";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { homecateoriesSucces } from "../../features/adSlice";

const integrations = [
  {
    id: "664f071878452e854b178cec",
    title: "Auto & Rad",
    icon: Car,
  },
  {
    id: "664f07c378452e854b178d32",
    title: "Möbel",
    icon: Furniture,
  },
  {
    id: "664f06ef78452e854b178cd8",
    title: "Elektronik",
    icon: Electronics,
  },
  {
    id: "664f084a78452e854b178dae",
    title: "Haustiere",
    icon: Animals,
  },
  {
    id: "664f080078452e854b178d6a",
    title: "Mode",
    icon: Fashion,
  },
  {
    id: "664f073178452e854b178d08",
    title: "Haus & Garten",
    icon: Properties,
  },
];

const CategoryIconCard = () => {
  const { category } = useSelector((state) => state.category);
  const { ad } = useSelector((state) => state.ad);
  //console.log(ad,"crrrrrr")
  // console.log(category, "category card");
  const dispatch = useDispatch();

  const handleClick = (itemId) => {
    // console.log(itemId);
    const selCategory = category?.find((item) => item._id === itemId);
    //   console.log(selCategory, "sellllllllll");
    if (selCategory) {
      const fildAds = ad?.filter((ob) => ob.categoryId === itemId) || [];
      //console.log(fildAds, "filterden gelen ");
      dispatch(homecateoriesSucces(fildAds));
      //console.log(selCategory.categoryName, "sonnnnnnnnn");
    }
  };

  return (
    <section className="-m-24 z-10 relative mb-10">
      <div className="overflow-hidden flex justify-center">
        <ul className="flex flex-wrap m-5 gap-10">
          {integrations.map((item) => (
            <Link key={item.id} to="/allad">
              <li className="border-2 rounded-xl w-44 h-44 bg-background-category-icon-blue p-5 flex justify-center items-center hover:border-button-blue active:translate-y-1">
                <button
                  onClick={() => handleClick(item.id)}
                  className="w-full h-full flex flex-col justify-center items-center focus:outline-none"
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-20 mx-auto"
                  />
                  <h4 className="text-gray-800 font-semibold mt-2">
                    {item.title}
                  </h4>
                </button>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategoryIconCard;
