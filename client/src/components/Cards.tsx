import type{ CardProps } from "../types/types";
import PageScroller from "./PageScroller";
const Cards = ({paginatedItems, pages} : CardProps) => {

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {paginatedItems.map((item, index) => (
          <div
            key={index}
            className="text-white border-4 border-gray-500 p-4 flex flex-col items-center rounded-xl w-full h-[400px]"
          >
            <h2 className="mb-2 font-bold text-center text-sm sm:text-base md:text-lg">
              {item.data[0].title}
            </h2>
            {item.links?.[0]?.href && (
              <div className="w-full h-60 mb-2">
                <img
                  src={item.links[0].href}
                  alt={item.data[0].title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <button className="border-2 border-blue-500 bg-blue-500 text-white rounded-xl px-4 py-2 mt-auto w-full">
              More details
            </button>
          </div>
        ))}
      </div>
      <PageScroller {...pages}/>
    </div>
  );
};

export default Cards;
