import React from "react";
import Car from "../../assets/automobile.png";
import Furniture from "../../assets/furniture.png";
import Electronics from "../../assets/electronics.png";
import Animals from "../../assets/animals.png";
import Fashion from "../../assets/fashion.png";
import Properties from "../../assets/properties.png";

const integrations = [
  {
    id: 1,
    title: "Auto & Rad",
    icon: Car,
  },
  {
    id: 2,
    title: "Möbel",
    icon: Furniture,
  },
  {
    id: 3,
    title: "Elektronik",
    icon: Electronics,
  },
  {
    id: 4,
    title: "Haustiere",
    icon: Animals,
  },
  {
    id: 5,
    title: "Mode",
    icon: Fashion,
  },
  {
    id: 6,
    title: "Haus & Garten",
    icon: Properties,
  },
];

const CategoryIconCard = () => {
  return (
    <section className="-m-24 z-10 relative mb-10">
      <div className="overflow-hidden flex justify-center ">
        <ul className="flex flex-wrap m-5 gap-10">
          {integrations.map((item) => (
            <a className=" " href="/allad" key={item.id}>
              <li className="border-2 rounded-xl w-44 h-44 bg-background-category-icon-blue p-5 flex justify-center items-center hover:border-button-blue active:translate-y-1">
                <div className="text-center ">
                  <div className=" ">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-20 mx-auto"
                    />
                    <div>
                      <h4 className="text-gray-800 font-semibold">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategoryIconCard;
